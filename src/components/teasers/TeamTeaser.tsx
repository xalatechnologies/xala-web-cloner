import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function TeamTeaser() {
  const { t } = useTranslation();
  
  // Helper function to make description generic (remove personal names)
  const makeGenericDescription = (desc: string): string => {
    if (!desc) return '';
    // Remove common personal name patterns and make it generic
    return desc
      .replace(/\b(Ibrahim|Hamid|Wahid|Elias|Amin)\s+\w+/gi, 'Our team')
      .replace(/\b(He|His|She|Her)\s+/gi, 'We ')
      .replace(/\b(He|She)\s+is/gi, 'We are')
      .replace(/\b(He|She)\s+leads/gi, 'We lead')
      .replace(/\b(He|She)\s+specializes/gi, 'We specialize')
      .trim();
  };

  // General role titles only - no names or images - limit to 3 cards for home page
  const teamRoles = [
    {
      role: t('teasers.team.members.ibrahim.role'),
      description: makeGenericDescription(t('teasers.team.members.ibrahim.description'))
    },
    {
      role: t('teasers.team.members.hamid.role'),
      description: makeGenericDescription(t('teasers.team.members.hamid.description'))
    },
    {
      role: t('teasers.team.members.wahid.role'),
      description: makeGenericDescription(t('teasers.team.members.wahid.description'))
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('teasers.team.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('teasers.team.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-12">
          {teamRoles.map((item, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-card text-card-foreground border border-border p-8 sm:p-10 lg:p-12 transition-all duration-300 hover:border-primary/40 hover:shadow-lg dark:bg-gradient-to-br dark:from-white/10 dark:to-white/5 dark:border-white/20 min-h-[280px] sm:min-h-[320px] flex flex-col justify-center">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-4 sm:mb-6">
                  {item.role}
                </h3>
                {item.description && (
                  <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed px-2">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link 
            to="/om-oss/team" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
          >
            {t('teasers.team.viewFullTeam')}
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}