import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main className="container mx-auto py-12">
        <p className="label">Tjenester</p>
        <h1 className="h-1 mt-2">Nettsider</h1>
        <p className="p-base mt-4 text-neutral">Beskrivelse kommer.</p>
      </main>
      <Footer />
    </>
  );
} 