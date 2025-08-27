import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Linkedin, Mail } from 'lucide-react';

export default function TeamTeaser() {
  const { t } = useTranslation();
  
  // Helper functions to match TeamMemberCard styling
  const getImagePositionClass = (name: string): string => {
    const n = name.toLowerCase();
    if (n.includes('elias')) {
      return 'object-[center_64%]';
    }
    if (n.includes('hamid')) {
      return 'object-[center_35%]';
    }
    if (n.includes('amin') || n.includes('wahid')) {
      return 'object-[center_38%]';
    }
    return 'object-[center_20%]';
  };

  const getScaleClasses = (name: string): { base: string; hover: string } => {
    const n = name.toLowerCase();
    if (n.includes('elias')) {
      return { base: 'scale-[1.08]', hover: 'group-hover:scale-[1.12]' };
    }
    if (n.includes('amin') || n.includes('wahid')) {
      return { base: 'scale-[1.18]', hover: 'group-hover:scale-[1.22]' };
    }
    return { base: 'scale-[1.08]', hover: 'group-hover:scale-[1.12]' };
  };
  
  const teamMembers = [
    {
      name: t('teasers.team.members.ibrahim.name'),
      role: t('teasers.team.members.ibrahim.role'),
      image: '/team/ibrahim.png',
      description: t('teasers.team.members.ibrahim.description'),
      email: t('teasers.team.members.ibrahim.email'),
      linkedin: t('teasers.team.members.ibrahim.linkedin')
    },
    {
      name: t('teasers.team.members.hamid.name'),
      role: t('teasers.team.members.hamid.role'),
      image: '/team/hamid.png',
      description: t('teasers.team.members.hamid.description'),
      email: t('teasers.team.members.hamid.email'),
      linkedin: t('teasers.team.members.hamid.linkedin')
    },
    {
      name: t('teasers.team.members.wahid.name'),
      role: t('teasers.team.members.wahid.role'),
      image: '/team/wahid.png',
      description: t('teasers.team.members.wahid.description'),
      email: t('teasers.team.members.wahid.email'),
      linkedin: t('teasers.team.members.wahid.linkedin')
    },
    {
      name: t('teasers.team.members.elias.name'),
      role: t('teasers.team.members.elias.role'),
      image: '/team/elias.png',
      description: t('teasers.team.members.elias.description'),
      email: t('teasers.team.members.elias.email'),
      linkedin: t('teasers.team.members.elias.linkedin')
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => {
            const positionClass = getImagePositionClass(member.name);
            const scaleClasses = getScaleClasses(member.name);
            
            return (
              <div key={index} className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-card text-card-foreground border border-border p-3 sm:p-4 transition-all duration-300 hover:border-primary/40 hover:shadow-lg dark:bg-gradient-to-br dark:from-white/10 dark:to-white/5 dark:border-white/20">
                <div className="relative w-full max-w-[280px] mx-auto aspect-square">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[95%] h-[95%] rounded-full overflow-hidden bg-muted dark:bg-gradient-to-b dark:from-white/5 dark:to-transparent p-0.5">
                      <img
                        src={member.image}
                        alt={member.name}
                        className={`w-full h-full object-cover ${positionClass} transform transition-transform duration-500 ${scaleClasses.base} ${scaleClasses.hover} rounded-full`}
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = '<div class="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-3xl sm:text-4xl">👤</div>';
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-3 sm:mt-4">
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-1">{member.name}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground font-semibold mb-2">{member.role}</p>
                  {member.description && (
                    <p className="text-sm sm:text-base text-muted-foreground line-clamp-4 group-hover:line-clamp-none transition-all duration-500">
                      {member.description}
                    </p>
                  )}
                </div>

                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex space-x-1.5">
                  {member.linkedin && (
                    <a 
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full bg-muted hover:bg-primary/10 transition-colors duration-300"
                      aria-label={`Open ${member.name}'s LinkedIn profile`}
                    >
                      <Linkedin className="w-4 h-4 text-primary" />
                    </a>
                  )}
                  <a 
                    href={`mailto:${member.email}`}
                    className="p-1.5 rounded-full bg-muted hover:bg-primary/10 transition-colors duration-300"
                    aria-label={`Send email to ${member.name}`}
                  >
                    <Mail className="w-4 h-4 text-primary" />
                  </a>
                </div>
              </div>
            );
          })}
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