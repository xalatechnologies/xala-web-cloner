import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function TeamTeaser() {
  const { t } = useTranslation();
  
  const teamMembers = [
    {
      name: t('teasers.team.members.wahid.name'),
      role: t('teasers.team.members.wahid.role'),
      image: '/team/wahid.jpg',
      description: t('teasers.team.members.wahid.description')
    },
    {
      name: t('teasers.team.members.amin.name'),
      role: t('teasers.team.members.amin.role'),
      image: '/team/amin.jpg',
      description: t('teasers.team.members.amin.description')
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center text-4xl">
                👤
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-1">{member.name}</h3>
              <p className="text-primary font-medium mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground">{member.description}</p>
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