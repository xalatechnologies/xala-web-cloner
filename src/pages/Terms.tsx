import { useTranslation } from 'react-i18next';
import LegalLayout from '@/components/layouts/LegalLayout';
import LegalSections from '@/components/layouts/LegalSections';
import { useLegalContent } from '@/hooks/use-legal-content';
import { Skeleton } from '@/components/ui/skeleton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useLegalContent({ type: 'terms' });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main id="main" className="flex-grow pt-20">
          <div className="container mx-auto px-4 max-w-4xl py-16 md:py-24">
            <div className="space-y-8">
              <div className="text-center">
                <Skeleton className="h-12 w-80 mx-auto mb-4" />
                <Skeleton className="h-4 w-48 mx-auto" />
              </div>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <div className="space-y-2 pl-4">
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/6" />
                    <Skeleton className="h-4 w-3/6" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main id="main" className="flex-grow pt-20">
        <LegalLayout
          title={data?.title || t('legal.terms.title', 'Vilkår for bruk')}
          lastUpdated={data?.lastUpdated || ''}
        >
          {data?.sections && <LegalSections sections={data.sections} />}
        </LegalLayout>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;