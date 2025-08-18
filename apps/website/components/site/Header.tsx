"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { Menu, Plus, X } from "lucide-react";
import clsx from "clsx";

type NavItem = { label: string; href: Route; children?: { label: string; href: Route }[] };

const NAV_ITEMS: NavItem[] = [
  { label: "Tjenester", href: "/tjenester", children: [
    { label: "Web‑applikasjoner", href: "/tjenester/web-applikasjoner" },
    { label: "E‑handel", href: "/tjenester/e-handel" },
    { label: "AI", href: "/tjenester/ai" },
    { label: "Konsulenttjenester", href: "/tjenester/konsulenttjenester" },
    { label: "Nettsider", href: "/tjenester/nettsider" },
  ] },
  { label: "Produkter", href: "/produkter", children: [
    { label: "Relatude", href: "/produkter/relatude" },
    { label: "Merida", href: "/produkter/merida" },
    { label: "Orgsys", href: "/produkter/orgsys" },
  ] },
  { label: "Referanser", href: "/referanser" },
  { label: "Aktuelt", href: "/aktuelt" },
  { label: "Om oss", href: "/om-oss" },
  { label: "Våre partnere", href: "/partnere" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Jobb hos oss", href: "/karriere" },
];

export function Header() {
  const [open, setOpen] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-[hsl(var(--bg))]/80 backdrop-blur border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2" aria-label="Xala hjem">
          <img src="/xala.svg" alt="Xala" className="h-7 md:h-8 w-auto" />
        </Link>
        <nav className="hidden" aria-label="Hovedmeny">
          {NAV_ITEMS.map((item, idx) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpen(idx)}
              onMouseLeave={() => item.children && setOpen((prev) => (prev === idx ? null : prev))}
            >
              <button
                className="flex items-center gap-1 p-2 rounded-md hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-expanded={open === idx}
                aria-controls={`menu-${idx}`}
                aria-haspopup={!!item.children}
                onClick={() => setOpen(open === idx ? null : idx)}
              >
                <span>{item.label}</span>
                {item.children && <Plus className={clsx("h-4 w-4 transition-transform", open === idx && "rotate-45")} />}
              </button>
              {item.children && open === idx && (
                <div
                  id={`menu-${idx}`}
                  role="menu"
                  className="absolute left-0 mt-2 min-w-[240px] rounded-lg border border-border bg-[hsl(var(--bg))] shadow-lg p-2"
                >
                  <ul>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link className="block px-3 py-2 rounded hover:bg-black/5" href={child.href} role="menuitem">{child.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>
        <button
          className="p-2 rounded-md hover:bg-black/5 flex items-center gap-1 ml-auto"
          aria-label="Åpne meny"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-6 w-6" />
          <span className="text-sm">Meny</span>
        </button>
      </div>

      {mobileOpen && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 bg-black/50 z-50" onClick={() => setMobileOpen(false)}>
          <div className="ml-auto h-full w-80 bg-[hsl(var(--bg))] p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <span className="font-semibold">Meny</span>
              <button aria-label="Lukk meny" className="p-2" onClick={() => setMobileOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-4 space-y-2">
              {NAV_ITEMS.map((item) => (
                <details key={item.label} className="group border-b border-border pb-2">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-2">
                    <span>{item.label}</span>
                    {item.children && <Plus className="h-4 w-4 group-open:rotate-45 transition-transform" />}
                  </summary>
                  {item.children && (
                    <ul className="pl-2 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link className="block px-2 py-1 rounded hover:bg-black/5" href={child.href}>{child.label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </details>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
} 