"use client";

import { useEffect, useState } from "react";

export default function DynamicHeroHeadline() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ["data", "AI", "moderne løsninger", "smart programvare", "digital innovasjon"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <h1 className="tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] mb-6">
      <span className="inline-block">
        Vi bruker{" "}
        <span
          key={currentWordIndex}
          className="font-semibold text-cyan-400 inline-block"
          style={{ animation: "fadeInOut 2s ease-in-out infinite" }}
        >
          {words[currentWordIndex]}
        </span>{" "}
        for å skape en {" "}
        <span className="font-semibold text-cyan-400">positiv forandring</span>
      </span>
      <style jsx>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}</style>
    </h1>
  );
} 