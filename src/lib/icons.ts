import {
  Accessibility,
  Blocks,
  Boxes,
  Briefcase,
  Building2,
  CalendarRange,
  CircleDot,
  ClipboardCheck,
  ClipboardList,
  Cloud,
  Code,
  Code2,
  Cpu,
  FileCheck2,
  FileText,
  HelpCircle,
  Layers,
  LayoutGrid,
  Lock,
  Network,
  Package,
  Palette,
  PenTool,
  Receipt,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * The icons the data files can name, imported explicitly.
 *
 * Several components used to do `import * as Icons from 'lucide-react'` so that
 * an icon name in a JSON file could be looked up at runtime. That works, and it
 * defeats tree-shaking completely: the wildcard makes every icon in the library
 * reachable, so the bundler keeps all of them. lucide-react came to 748 KB in
 * the build, a third of all the JavaScript on the site, to render about two
 * dozen glyphs.
 *
 * Naming them makes the set explicit and lets the bundler drop the rest. The
 * cost is that a new icon in a data file needs a line here — and that is a
 * feature rather than a tax, because an icon name with no import is a silent
 * fallback today and a build error tomorrow.
 */
const ICONS: Record<string, LucideIcon> = {
  Accessibility,
  Blocks,
  Boxes,
  Briefcase,
  Building2,
  CalendarRange,
  CircleDot,
  ClipboardCheck,
  ClipboardList,
  Cloud,
  Code,
  Code2,
  Cpu,
  FileCheck2,
  FileText,
  HelpCircle,
  Layers,
  LayoutGrid,
  Lock,
  Network,
  Package,
  Palette,
  PenTool,
  Receipt,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
};

/**
 * The named icon, or a fallback when the name is not registered.
 *
 * The fallback is a name too, so callers never have to import an icon just to
 * have something to fall back to — which is how the wildcard import crept in.
 */
export function resolveIcon(name: string | null | undefined, fallback = 'CircleDot'): LucideIcon {
  return (name ? ICONS[name] : undefined) ?? ICONS[fallback] ?? CircleDot;
}

/** Every registered name, for tests that check the data against the registry. */
export const registeredIcons = Object.keys(ICONS);
