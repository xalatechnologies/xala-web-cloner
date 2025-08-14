import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main className="container mx-auto py-12">
        <h1 className="h-1">Kontakt</h1>
        <p className="p-base mt-4 text-neutral">Ta kontakt med oss på hello@xala.no</p>
      </main>
      <Footer />
    </>
  );
} 