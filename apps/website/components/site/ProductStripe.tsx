const PRODUCTS = [
  { title: "DoctorAI", href: "/produkter/doctorai" },
  { title: "NextBid", href: "/produkter/nextbid" },
  { title: "SprintSense", href: "/produkter/sprintsense" },
];

export function ProductStripe() {
  return (
    <div>
      <h2 className="h-3 mb-6">Produkter</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PRODUCTS.map((p) => (
          <a key={p.title} href={p.href} className="rounded-lg border border-border bg-white/70 dark:bg-black/20 p-4 hover:shadow-md">
            <div className="h-10 w-32 bg-neutral/30 rounded mb-4" />
            <div className="font-medium">{p.title}</div>
          </a>
        ))}
      </div>
    </div>
  );
} 