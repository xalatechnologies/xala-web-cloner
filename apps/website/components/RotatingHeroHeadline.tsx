"use client";

import { useEffect, useMemo, useState } from "react";
import HeroHeadline, { IHeroHeadlineProps } from "./HeroHeadline";

export interface RotatingHeroHeadlineProps {
  variants: Required<Pick<IHeroHeadlineProps, "pre" | "highlight" | "post">>[];
  className?: string;
  intervalMs?: number; // time to show each variant
}

export default function RotatingHeroHeadline({ variants, className = "", intervalMs = 3500 }: RotatingHeroHeadlineProps) {
  const [index, setIndex] = useState(0);

  const reduceMotion = useMemo(() =>
    typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  []);

  useEffect(() => {
    if (!variants?.length) return;
    if (reduceMotion) return; // keep first variant if reduced motion

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % variants.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [variants, intervalMs, reduceMotion]);

  const v = variants[Math.min(index, variants.length - 1)] ?? variants[0];
  return <HeroHeadline {...v} className={className} />;
} 