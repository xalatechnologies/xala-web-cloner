import { useTranslation } from 'react-i18next';
import LegalLayout from '@/components/layouts/LegalLayout';
import { useLegalContent } from '@/hooks/use-legal-content';
import { Skeleton } from '@/components/ui/skeleton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CookiesPolicy = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useLegalContent({ type: 'cookies' });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-grow pt-20">
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
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-grow pt-20">
        <LegalLayout
          title={t('cookies.title')}
          lastUpdated={data?.lastUpdated || ''}
        >
          {data?.sections.map((section) => (
            <section key={section.id} className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
              {section.description && (
                <p className="text-foreground/80 leading-relaxed">{section.description}</p>
              )}
              {section.items.length > 0 && (
                <ul className="space-y-4 pl-6 list-disc marker:text-primary">
                  {section.items.map((item) => (
                    <li key={item.id} className="text-foreground/90">
                      {item.title && <strong className="text-primary dark:text-amber-400">{item.title}: </strong>}
                      {item.content}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </LegalLayout>
      </div>
      <Footer />
    </div>
  );
};

export default CookiesPolicy;