const PROJECTS = [
  { title: "Prosjekt A", excerpt: "Kortsammendrag av prosjektet.", href: "/referanser/prosjekt-a" },
  { title: "Prosjekt B", excerpt: "Kortsammendrag av prosjektet.", href: "/referanser/prosjekt-b" },
  { title: "Prosjekt C", excerpt: "Kortsammendrag av prosjektet.", href: "/referanser/prosjekt-c" }
];

export function ProjectCards() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="h-2">Siste prosjekter</h2>
        <a href="/referanser" className="p-small">Se alle</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((p) => (
          <a key={p.title} href={p.href} className="rounded-xl border border-border overflow-hidden bg-white/70 dark:bg-black/20">
            <div className="aspect-[16/9] bg-neutral/20" />
            <div className="p-4">
              <h3 className="h-4">{p.title}</h3>
              <p className="p-small text-neutral mt-1">{p.excerpt}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
} 