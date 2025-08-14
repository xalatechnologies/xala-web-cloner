export function ClientLogos() {
  const clients = ["Altinn", "Ruter", "SSB", "Sykehuspartner"];
  return (
    <div>
      <h2 className="h-3 mb-6">Våre kunder</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
        {clients.map((name) => (
          <div key={name} className="grayscale opacity-80 hover:opacity-100 transition-opacity">
            <div className="h-12 bg-neutral/20 rounded" aria-label={name} />
          </div>
        ))}
      </div>
    </div>
  );
} 