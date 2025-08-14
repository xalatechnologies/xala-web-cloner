type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Brødsmuler" className="p-small text-neutral">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-2">
            {c.href ? (
              <a href={c.href} className="underline-offset-2 hover:underline">{c.label}</a>
            ) : (
              <span aria-current="page">{c.label}</span>
            )}
            {i < items.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
} 