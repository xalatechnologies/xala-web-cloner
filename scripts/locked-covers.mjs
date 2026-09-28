/**
 * Blog covers whose bytes are pinned. verify-dist and vitest fail if a locked
 * file drifts — catches silent regressions from merge conflicts or bulk scripts.
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

/** @typedef {{ path: string, distPath: string, sha256: string, bytes: number, issue?: string, note?: string }} LockedCover */

/** @type {LockedCover[]} */
export const LOCKED_COVERS = [
  {
    path: 'public/images/blog/ki-pa-gamle-vaner-holder-ikke.webp',
    distPath: 'images/blog/ki-pa-gamle-vaner-holder-ikke.webp',
    sha256: '9c805be926ae74b4dbb8c02ab403afe79d93f0ab88a9cee0a69842111b142bd4',
    bytes: 48966,
    issue: 'XWEB-209',
    note: 'Cream master (PR #152 / ab978fa9). Reject 136040 B dark-gold (sha256 2cd915db).',
  },
];

/**
 * @param {string} filePath
 * @returns {{ sha256: string, bytes: number }}
 */
export function fileDigest(filePath) {
  const buf = readFileSync(filePath);
  return {
    sha256: createHash('sha256').update(buf).digest('hex'),
    bytes: buf.length,
  };
}

/**
 * @param {string} root Repo root (parent of public/)
 * @param {LockedCover[]} covers
 * @param {{ distRoot?: string, label?: string }} [opts]
 * @returns {string[]} Human-readable failure messages (empty = ok)
 */
export function lockedCoverFailures(root, covers = LOCKED_COVERS, opts = {}) {
  const { distRoot, label = 'locked cover' } = opts;
  const failures = [];

  for (const cover of covers) {
    const source = join(root, cover.path);
    if (!existsSync(source)) {
      failures.push(`${label}: ${cover.path} missing`);
      continue;
    }

    const { sha256, bytes } = fileDigest(source);
    if (sha256 !== cover.sha256 || bytes !== cover.bytes) {
      failures.push(
        `${label}: ${cover.path} must stay the ${cover.issue ?? 'locked'} cream master ` +
          `(expected ${cover.bytes} B sha256 ${cover.sha256}, got ${bytes} B sha256 ${sha256}). ` +
          `${cover.note ?? ''}`.trim()
      );
    }

    if (distRoot) {
      const distFile = join(distRoot, cover.distPath);
      if (!existsSync(distFile)) {
        failures.push(`${label}: dist/${cover.distPath} missing after build`);
        continue;
      }
      const distBytes = statSync(distFile).size;
      const distSha = fileDigest(distFile).sha256;
      if (distSha !== cover.sha256 || distBytes !== cover.bytes) {
        failures.push(
          `${label}: dist/${cover.distPath} must match source ` +
            `(expected ${cover.bytes} B sha256 ${cover.sha256}, got ${distBytes} B sha256 ${distSha})`
        );
      }
    }
  }

  return failures;
}
