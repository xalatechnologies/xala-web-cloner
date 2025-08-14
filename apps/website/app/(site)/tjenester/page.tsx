import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main className="container mx-auto py-12">
        <h1 className="h-1">Tjenester</h1>
        <p className="p-base mt-4 text-neutral">Oversikt over våre tjenester.</p>
      </main>
      <Footer />
    </>
  );
} 