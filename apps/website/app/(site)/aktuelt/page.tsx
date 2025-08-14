import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ArticleList } from "@/components/site/ArticleList";

export default function Page() {
  return (
    <>
      <Header />
      <main className="container mx-auto py-12">
        <h1 className="h-1">Aktuelt</h1>
        <div className="mt-6">
          <ArticleList />
        </div>
      </main>
      <Footer />
    </>
  );
} 