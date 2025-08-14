export function ArticleList() {
  const articles = [
    { title: "Nyhet A", date: "2025-02-01", category: "Nyhet", href: "/aktuelt/nyhet-a" },
    { title: "Nyhet B", date: "2025-01-20", category: "Fag", href: "/aktuelt/nyhet-b" },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {articles.map((a) => (
        <a key={a.href} href={a.href} className="rounded-xl border border-border overflow-hidden bg-white/70 dark:bg-black/20">
          <div className="aspect-[16/9] bg-neutral/20" />
          <div className="p-4">
            <div className="flex items-center gap-2 text-xs text-neutral">
              <span className="uppercase">{a.category}</span>
              <span aria-hidden>•</span>
              <time dateTime={a.date}>{new Date(a.date).toLocaleDateString("no-NO")}</time>
            </div>
            <h3 className="h-4 mt-1">{a.title}</h3>
          </div>
        </a>
      ))}
    </div>
  );
} 