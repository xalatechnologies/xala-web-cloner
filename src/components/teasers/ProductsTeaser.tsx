import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileText, ClipboardList, Boxes, ChevronRight, Sparkles } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { SurfaceCard, CardIcon } from '@/components/ui/surface-card';

export default function ProductsTeaser() {
  const { t } = useTranslation();

  const products = [
    {
      title: 'Digilist',
      description: t('products.digilist.description'),
      status: t('products.digilist.status'),
      statusType: 'available',
      icon: ClipboardList,
      url: 'https://digilist.no'
    },
    {
      title: 'Digiskjema',
      description: t('products.digiskjema.description'),
      status: t('products.digiskjema.status'),
      statusType: 'available',
      icon: FileText,
      url: 'https://digiskjema.no'
    },
    {
      title: 'Xaheen',
      description: t('products.xaheen.description'),
      status: t('products.xaheen.status'),
      statusType: 'available',
      icon: Sparkles,
      url: 'https://xaheen.com'
    },
    {
      title: 'Norchain',
      description: t('products.norchain.description'),
      status: t('products.norchain.status'),
      statusType: 'available',
      icon: Boxes,
      url: 'https://norchain.org'
    }
  ];

  const getStatusClasses = (type: string) => {
    switch (type) {
      case 'available':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'beta':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-muted text-foreground';
    }
  };

  return (
    <Section tone="muted" size="sm" styled container={false}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            {t('teasers.products.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('teasers.products.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {products.map((product, index) => {
            const IconComponent = product.icon;
            return (
              <SurfaceCard key={index} href={product.url}>
                <div className="flex items-center gap-4 mb-5">
                  <CardIcon>
                    <IconComponent className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </CardIcon>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-xl md:text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
                        {product.title}
                      </h3>
                      <span className={`px-3 py-1 text-xs rounded-full font-medium shrink-0 ${getStatusClasses(product.statusType)}`}>
                        {product.status}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-base md:text-lg text-muted-foreground group-hover:text-foreground leading-relaxed transition-colors duration-300 pl-0 md:pl-[68px]">
                  {product.description}
                </p>
              </SurfaceCard>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to="/produkter"
            className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {t('teasers.products.viewAll')}
            <ChevronRight className="ms-3 h-5 w-5 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </Section>
  );
}