"use client";

export interface IHeroHeadlineProps {
  pre?: string;
  highlight?: string;
  post?: string;
  className?: string;
}

export default function HeroHeadline({
  pre = "Vi bruker",
  highlight = "din nøkkelfrase",
  post = "for å skape verdi",
  className = ""
}: IHeroHeadlineProps) {
  return (
    <h1
      className={[
        "tracking-tight",
        "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold",
        "leading-[1.05]",
        className
      ].join(" ")}
    >
      <span className="inline">
        {pre}{" "}
        <span className="relative inline-flex items-baseline">
          <span className="inline">{highlight}</span>
        </span>
      </span>
      <br className="hidden sm:block" />
      <span className="inline">{post}</span>
    </h1>
  );
} 