import React from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  cta?: React.ReactNode;
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  cta,
}: PageHeaderProps) {
  return (
    <header className="bg-[#F7F3EA]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {eyebrow && (
          <p className="text-sm font-semibold text-[#A47864]">{eyebrow}</p>
        )}
        <h1 className="mt-1 text-3xl md:text-4xl font-bold text-[#0F172A]">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-3xl text-[#475569]">{description}</p>
        )}
        {cta && <div className="mt-6">{cta}</div>}
      </div>
    </header>
  );
}