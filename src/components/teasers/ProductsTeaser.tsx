import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ProductsTeaser() {
  const { t } = useTranslation();
  
  const products = [
    {
      title: t('teasers.products.fylleut.title'),
      description: t('teasers.products.fylleut.description'),
      status: t('teasers.products.available')
    },
    {
      title: t('teasers.products.nextbid.title'),
      description: t('teasers.products.nextbid.description'),
      status: t('teasers.products.beta')
    },
    {
      title: t('teasers.products.supplymantix.title'),
      description: t('teasers.products.supplymantix.description'),
      status: t('teasers.products.coming')
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('teasers.products.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('teasers.products.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {products.map((product, index) => (
            <div key={index} className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-card-foreground">{product.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  product.status === t('teasers.products.available') ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                  product.status === t('teasers.products.beta') ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {product.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{product.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link 
            to="/produkter" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
          >
            {t('teasers.products.viewAll')}
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}