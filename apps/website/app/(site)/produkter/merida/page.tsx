import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main className="container mx-auto py-12">
        <p className="label">Produkter</p>
        <h1 className="h-1 mt-2">Merida</h1>
        <p className="p-base mt-4 text-neutral">Produktinformasjon kommer.</p>
      </main>
      <Footer />
    </>
  );
} 