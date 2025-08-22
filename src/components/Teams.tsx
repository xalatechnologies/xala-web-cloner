import { useTranslation } from "react-i18next";
import { useSection } from "@/hooks/use-section";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from '@/integrations/supabase/types';
import MainLayout from './layouts/MainLayout';
import TeamGrid from './teams/TeamGrid';

type TeamMember = Database['public']['Tables']['team_members']['Row'];
type SupportedLanguage = Database['public']['Enums']['supported_language'];

const Teams = () => {
  const { t, i18n } = useTranslation();
  const { data: section, isLoading: isSectionLoading } = useSection('team');
  
  const normalizeLanguage = (lang: string): SupportedLanguage => {
    return lang.toLowerCase().split('-')[0] as SupportedLanguage;
  };
  
  const currentLanguage = normalizeLanguage(i18n.language);
  
  const { data: teamMembers = [], isLoading: isTeamLoading } = useQuery({
    queryKey: ['team-members', currentLanguage],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('language', currentLanguage)
        .order('sort_order', { ascending: true });

      if (error) {
        throw new Error('Failed to fetch team members');
      }

      return data || [];
    }
  });

  const isLoading = isSectionLoading || isTeamLoading;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
        </div>
      );
    }

    // Fallback: ensure Amin is shown even if DB hasn't been seeded yet
    const fallbackAmin: TeamMember = {
      id: 'amin-local',
      name: 'Amin Ismail',
      role: currentLanguage === 'no' ? 'Fullstack programvareutvikler' : 'Full‑stack Software Engineer',
      description:
        currentLanguage === 'no'
          ? 'Fullstack‑utvikler med fokus på robuste og skalerbare webløsninger. Erfaring med React, TypeScript, Node.js og sky. Brenner for ryddig arkitektur, god utvikleropplevelse og brukervennlige grensesnitt.'
          : 'Full‑stack engineer focused on reliable, scalable web apps. Experienced with React, TypeScript, Node.js and cloud. Passionate about clean architecture, developer productivity and delightful UIs.',
      image_url: '/team/amin.png',
      linkedin_url: 'https://www.linkedin.com/in/amin-ismail-moh/',
      email: 'amin@xala.no',
      sort_order: 999,
      language: currentLanguage,
      created_at: null,
      updated_at: null,
    } as unknown as TeamMember;

    const present = new Set(teamMembers.map(m => (m.name || '').toLowerCase()));
    const merged = present.has('amin ismail') ? teamMembers : [...teamMembers, fallbackAmin];

    if (!merged.length) {
      return (
        <div className="text-center text-xala-text">
          <p>{t('No team members available')}</p>
        </div>
      );
    }

    return (
      <TeamGrid 
        members={merged}
        initialRows={section?.rows || 1}
        cols={section?.columns || 3}
      />
    );
  };

  if (!section) return null;

  return (
    <MainLayout 
      pageId="team"
      language={i18n.language}
    >
      <section id="team" className="py-12 sm:py-16 lg:py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12">
            <div className="flex flex-col gap-3 sm:gap-4 text-center">
              <h2 className="text-2xl sm:text-3xl lg:py-4 text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {section.title}
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
                {section.description}
              </p>
            </div>
            <div className="w-full">
              {renderContent()}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Teams;