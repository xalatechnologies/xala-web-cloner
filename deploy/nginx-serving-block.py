#!/usr/bin/env python3
"""Find the nginx server block that actually serves xala.no files.

The :80 server_name block is usually a redirect and has no `root`. Putting
the /blogg?q= include there is a no-op: GET /blogg?q=gebyr still hits the
TLS block and is served as the unfiltered listing. The serving block is the
one whose `root` points at the `current` release symlink.
"""

from __future__ import annotations

import argparse
import os
import re
import sys
from pathlib import Path

INCLUDE_DEFAULT = "include /etc/nginx/snippets/xala-blogg-query.conf;"
CONFIG_DIRS = (
    "/etc/nginx/sites-enabled",
    "/etc/nginx/conf.d",
    "/etc/nginx/sites-available",
)
CONFIG_FILES = ("/etc/nginx/nginx.conf",)
# Never write .bak next to a live vhost: nginx loads everything in
# sites-enabled / conf.d, so a sibling backup becomes a second server_name.
BACKUP_DIRS = (Path("/var/backups/nginx"), Path("/tmp/nginx-backups"))
BACKUP_MAP = "blogg-query-backup.map"
BACKUP_ENV = "XALA_NGINX_BACKUP_DIR"

SERVER_HEAD = re.compile(r"(?m)^\s*server\s*\{")
SERVER_NAME = re.compile(r"server_name\s+[^;]*\bxala\.no\b")
ROOT_CURRENT = re.compile(r"(?m)^\s*root\s+[^;]*\bcurrent\b")


def server_blocks(text: str) -> list[tuple[int, int, str]]:
    blocks: list[tuple[int, int, str]] = []
    pos = 0
    while True:
        match = SERVER_HEAD.search(text, pos)
        if not match:
            break
        brace = text.find("{", match.start())
        if brace < 0:
            break
        depth = 0
        i = brace
        while i < len(text):
            ch = text[i]
            if ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    end = i + 1
                    blocks.append((match.start(), end, text[match.start() : end]))
                    pos = end
                    break
            i += 1
        else:
            break
    return blocks


def is_serving_block(block: str) -> bool:
    return bool(SERVER_NAME.search(block) and ROOT_CURRENT.search(block))


def serving_blocks(text: str) -> list[tuple[int, int, str]]:
    return [block for block in server_blocks(text) if is_serving_block(block[2])]


def ensure_include(text: str, include: str) -> tuple[str, int]:
    """Insert `include` into every serving block that lacks it. Returns (text, inserts)."""
    inserts = 0
    pieces: list[str] = []
    pos = 0
    for start, end, block in serving_blocks(text):
        pieces.append(text[pos:start])
        if include in block:
            pieces.append(block)
        else:
            updated = re.sub(r"(\bserver\s*\{)", r"\1\n    " + include, block, count=1)
            if include not in updated:
                raise SystemExit(f"failed to insert include into serving block:\n{block}")
            pieces.append(updated)
            inserts += 1
        pos = end
    pieces.append(text[pos:])
    return "".join(pieces), inserts


def serving_block_has_include(text: str, include: str) -> bool:
    found = serving_blocks(text)
    return bool(found) and all(include in block for _, _, block in found)


def is_backup_config(path: Path) -> bool:
    """True for leftover install copies nginx must not treat as a vhost."""
    name = path.name
    return ".bak" in name or name.endswith(".bak-blogg-query")


def backup_root() -> Path:
    override = os.environ.get(BACKUP_ENV)
    candidates = [Path(override)] if override else list(BACKUP_DIRS)
    last_error: OSError | None = None
    for root in candidates:
        try:
            root.mkdir(parents=True, exist_ok=True)
            probe = root / ".writable"
            probe.write_text("", encoding="utf-8")
            probe.unlink()
            return root
        except OSError as exc:
            last_error = exc
            continue
    raise SystemExit(f"cannot write nginx backups outside serving directories: {last_error}")


def record_backup(source: Path, dest: Path) -> None:
    map_file = dest.parent / BACKUP_MAP
    with map_file.open("a", encoding="utf-8") as handle:
        handle.write(f"{source}\t{dest}\n")


def write_backup(source: Path, original: str, suffix: str) -> Path:
    dest = backup_root() / f"{source.name}{suffix}"
    if dest.exists():
        dest = backup_root() / f"{source.name}{suffix}.{os.getpid()}"
    dest.write_text(original, encoding="utf-8")
    record_backup(source, dest)
    return dest


def quarantine_loaded_backups() -> None:
    """Move leftover *.bak* out of directories nginx actually loads."""
    root = backup_root()
    leftovers: list[Path] = []
    for directory in CONFIG_DIRS:
        folder = Path(directory)
        if folder.is_dir():
            leftovers.extend(sorted(p for p in folder.iterdir() if p.is_file() and is_backup_config(p)))
    nginx_bak = Path("/etc/nginx/nginx.conf.bak-blogg-query")
    if nginx_bak.is_file():
        leftovers.append(nginx_bak)
    for path in leftovers:
        dest = root / path.name
        if dest.exists():
            dest = root / f"{path.name}.{os.getpid()}"
        os.replace(path, dest)
        print(f"moved leftover backup {path} -> {dest}")


def iter_config_paths(explicit: list[str] | None = None) -> list[Path]:
    if explicit:
        return [Path(path) for path in explicit if not is_backup_config(Path(path))]
    seen: set[str] = set()
    paths: list[Path] = []
    candidates = [Path(path) for path in CONFIG_FILES]
    for directory in CONFIG_DIRS:
        folder = Path(directory)
        if folder.is_dir():
            candidates.extend(sorted(p for p in folder.iterdir() if p.is_file()))
    for path in candidates:
        if not path.is_file() or is_backup_config(path):
            continue
        real = os.path.realpath(path)
        if real in seen:
            continue
        try:
            text = path.read_text(encoding="utf-8")
        except OSError:
            continue
        if "xala.no" not in text or "server_name" not in text:
            continue
        seen.add(real)
        paths.append(path)
    return paths


def cmd_apply(args: argparse.Namespace) -> int:
    source = Path(args.config).read_text(encoding="utf-8")
    if not serving_blocks(source):
        print("no server block with server_name xala.no and root …/current", file=sys.stderr)
        return 1
    updated, _ = ensure_include(source, args.include)
    sys.stdout.write(updated)
    return 0


def cmd_verify(args: argparse.Namespace) -> int:
    text = Path(args.config).read_text(encoding="utf-8")
    if serving_block_has_include(text, args.include):
        return 0
    print("serving block (root/current) does not include the /blogg?q= rewrite", file=sys.stderr)
    return 1


def cmd_check(args: argparse.Namespace) -> int:
    include = args.include
    paths = iter_config_paths(args.config)
    serving_files = [path for path in paths if serving_blocks(path.read_text(encoding="utf-8"))]
    if not serving_files:
        print("no serving block (root/current) for xala.no", file=sys.stderr)
        return 1
    for path in serving_files:
        if not serving_block_has_include(path.read_text(encoding="utf-8"), include):
            print(f"{path}: serving block missing {include}", file=sys.stderr)
            return 1
    print(f"include present in {len(serving_files)} serving block file(s)")
    return 0


def cmd_install(args: argparse.Namespace) -> int:
    include = args.include
    if not args.config:
        quarantine_loaded_backups()
    paths = iter_config_paths(args.config)
    if not paths:
        print("no nginx config mentioning server_name xala.no", file=sys.stderr)
        return 1

    serving_files = [path for path in paths if serving_blocks(path.read_text(encoding="utf-8"))]
    if not serving_files:
        print(
            "no server block with both `server_name xala.no` and `root` … `current` — "
            "refusing to insert after the first server_name (that is usually :80)",
            file=sys.stderr,
        )
        return 1

    suffix = args.backup_suffix
    for path in serving_files:
        original = path.read_text(encoding="utf-8")
        updated, inserts = ensure_include(original, include)
        if inserts:
            if suffix:
                write_backup(path, original, suffix)
            path.write_text(updated, encoding="utf-8")

    for path in serving_files:
        text = path.read_text(encoding="utf-8")
        if not serving_block_has_include(text, include):
            print(f"{path}: serving block still missing {include}", file=sys.stderr)
            return 1

    print(f"include present in {len(serving_files)} serving block file(s)")
    return 0


def cmd_restore(args: argparse.Namespace) -> int:
    roots: list[Path] = []
    override = os.environ.get(BACKUP_ENV)
    if override:
        roots.append(Path(override))
    roots.extend(BACKUP_DIRS)
    restored = 0
    seen: set[str] = set()
    for root in roots:
        map_file = root / BACKUP_MAP
        if not map_file.is_file():
            continue
        for line in map_file.read_text(encoding="utf-8").splitlines():
            if not line.strip() or "\t" not in line:
                continue
            source_s, dest_s = line.split("\t", 1)
            if dest_s in seen:
                continue
            dest = Path(dest_s)
            source = Path(source_s)
            if not dest.is_file():
                continue
            source.parent.mkdir(parents=True, exist_ok=True)
            source.write_text(dest.read_text(encoding="utf-8"), encoding="utf-8")
            seen.add(dest_s)
            restored += 1
    print(f"restored {restored} serving-block backup(s)")
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--include", default=INCLUDE_DEFAULT)
    sub = parser.add_subparsers(dest="cmd", required=True)

    apply_p = sub.add_parser("apply", help="rewrite one config file onto stdout")
    apply_p.add_argument("config")
    apply_p.set_defaults(func=cmd_apply)

    verify_p = sub.add_parser("verify", help="exit 0 only if the serving block has the include")
    verify_p.add_argument("config")
    verify_p.set_defaults(func=cmd_verify)

    check_p = sub.add_parser("check", help="exit 0 only if live serving blocks have the include")
    check_p.add_argument("config", nargs="*")
    check_p.set_defaults(func=cmd_check)

    install_p = sub.add_parser("install", help="insert include into live serving blocks")
    install_p.add_argument("config", nargs="*")
    install_p.add_argument("--backup-suffix", default=".bak-blogg-query")
    install_p.set_defaults(func=cmd_install)

    restore_p = sub.add_parser("restore", help="restore serving blocks from backups outside nginx load dirs")
    restore_p.add_argument("--backup-suffix", default=".bak-blogg-query")
    restore_p.set_defaults(func=cmd_restore)

    args = parser.parse_args(argv)
    return args.func(args)


if __name__ == "__main__":
    sys.exit(main())
