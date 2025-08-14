const SERVICES = [
  { title: "Web‑applikasjoner", body: "Skreddersydde løsninger for kjerneprosesser.", href: "/tjenester/web-applikasjoner" },
  { title: "E‑handel", body: "Komplette handelsopplevelser og integrasjoner.", href: "/tjenester/e-handel" },
  { title: "AI", body: "Rådgivning, assistenter og automatisering.", href: "/tjenester/ai" },
  { title: "Nettsider", body: "Rask, tilgjengelig og søkemotoroptimalisert.", href: "/tjenester/nettsider" },
];

export function ServiceGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {SERVICES.map((s) => (
        <a key={s.title} href={s.href} className="rounded-xl border border-border p-6 hover:shadow-lg transition-shadow bg-white/70 dark:bg-black/20">
          <div className="h-3 w-12 rounded-full bg-accent/30 mb-4" />
          <h3 className="h-4">{s.title}</h3>
          <p className="p-small mt-2 text-neutral">{s.body}</p>
        </a>
      ))}
    </div>
  );
} 