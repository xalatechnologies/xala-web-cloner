"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function useTypedPhrases(phrases: string[], typingMs = 60, holdMs = 1200, eraseMs = 40) {
  const [text, setText] = useState<string>("");
  const [phraseIndex, setPhraseIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  const reduceMotion = useMemo(() =>
    typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  []);

  useEffect(() => {
    if (phrases.length === 0) return;

    // Reduced motion: show first phrase and stop
    if (reduceMotion) {
      setText(phrases[0]);
      return;
    }

    const current = phrases[phraseIndex % phrases.length];
    const target = isDeleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1);
    const doneTyping = !isDeleting && target === current;
    const doneErasing = isDeleting && text.length === 0;

    const delay = doneTyping ? holdMs : isDeleting ? eraseMs : typingMs;

    timerRef.current = window.setTimeout(() => {
      setText(target);
      if (doneTyping) {
        setIsDeleting(true);
      } else if (doneErasing) {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }
    }, delay) as unknown as number;

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [text, isDeleting, phraseIndex, phrases, typingMs, holdMs, eraseMs, reduceMotion]);

  return text;
}

export function Hero() {
  const phrases = [
    "smarte prosesser",
    "presis utvikling",
    "pålitelig ytelse",
    "moderne arkitektur",
  ];
  const typed = useTypedPhrases(phrases, 250, 2000, 500);
  const longest = useMemo(() => Math.max(...phrases.map((p) => p.length)), [phrases]);

  return (
    <section className="container mx-auto py-20 md:py-28">
      <div className="frontpage-heading-text h-display">
        <div>
          <a href="#" className="scroll-help-link">
            Vi&nbsp;bruker&nbsp;
            <strong>
              <span
                id="element"
                aria-live="polite"
                aria-atomic="true"
                style={{ display: "inline-block", minWidth: `${longest}ch` }}
              >
                {typed}
              </span>
              <span className="typed-caret" aria-hidden="true" />
            </strong>
            &nbsp;for&nbsp;å&nbsp;
          </a>
        </div>
        <div>
          <a href="#" className="scroll-help-link">skape&nbsp;en&nbsp;<strong>positiv&nbsp;forandring</strong></a>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href="/kontakt" className="inline-flex items-center rounded-md bg-primary px-5 py-3 text-white">
          Kontakt oss
        </a>
        <a href="/tjenester" className="inline-flex items-center rounded-md border border-border px-5 py-3">
          Se tjenester
        </a>
      </div>
    </section>
  );
} 