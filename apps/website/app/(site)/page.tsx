import RotatingHeroHeadline from "@/components/RotatingHeroHeadline";
import DynamicHeroHeadline from "@/components/DynamicHeroHeadline";
import { Header } from "@/components/site/Header";
import { ServiceGrid } from "@/components/site/ServiceGrid";
import { ProjectCards } from "@/components/site/ProjectCards";
import { ProductStripe } from "@/components/site/ProductStripe";
import { ClientLogos } from "@/components/site/ClientLogos";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";

const variants = [
  { pre: "Vi bruker", highlight: "digital nyskaping", post: "for å skape varig forbedring" },
  { pre: "Vi bruker", highlight: "AI-drevet innovasjon", post: "for å gjøre en forskjell" },
  { pre: "Vi bruker", highlight: "fremtidsrettet teknologi", post: "for å skape målbar verdi" },
  { pre: "Vi bruker", highlight: "datadrevet innsikt", post: "for å styrke beslutninger" },
  { pre: "Vi bruker", highlight: "brukerorientert design", post: "for å skape konkrete resultater" }
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section - Background Only */}
        <section
          className="relative h-screen bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/What-Does-It-Mean-for-Computers.jpg')",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <div className="max-w-5xl">
              <DynamicHeroHeadline />
              {/* CTA / subcontent can go here if needed */}
            </div>
          </div>
        </section>

        <section className="container mx-auto py-16">
          <ServiceGrid />
        </section>
        <section className="container mx-auto py-16">
          <ProjectCards />
        </section>
        <section className="py-16 bg-white/60 dark:bg-black/20">
          <div className="container mx-auto">
            <ProductStripe />
          </div>
        </section>
        <section className="container mx-auto py-16">
          <ClientLogos />
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
} 