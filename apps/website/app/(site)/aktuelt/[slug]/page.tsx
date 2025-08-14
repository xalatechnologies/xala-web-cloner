import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <>
      <Header />
      <main className="container mx-auto py-12">
        <p className="label">Aktuelt</p>
        <h1 className="h-1 mt-2">{decodeURIComponent(slug).replace(/-/g, " ")}</h1>
        <p className="p-base mt-4 text-neutral">Artikkelinnhold kommer.</p>
      </main>
      <Footer />
    </>
  );
} 