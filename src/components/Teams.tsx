import { useTranslation } from "react-i18next";
import { useSection } from "@/hooks/use-section";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from '@/integrations/supabase/types';
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
  
  const { data: teamMembers, isLoading: isTeamLoading } = useQuery({
    queryKey: ['team-members', currentLanguage],
    queryFn: async () => {
      console.log('Fetching team members for language:', currentLanguage);
      
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('language', currentLanguage)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error fetching team members:', error);
        throw error;
      }

      return data as TeamMember[];
    }
  });

  const isLoading = isSectionLoading || isTeamLoading;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3].map((n) => (
            <div key={n} className="animate-pulse bg-white/5 rounded-2xl h-96"></div>
          ))}
        </div>
      );
    }

    if (!teamMembers?.length) {
      return (
        <div className="text-center text-xala-text">
          {t('team.noMembers')}
        </div>
      );
    }

    return (
      <TeamGrid 
        members={teamMembers}
      />
    );
  };

  return (
    <section id="team" className="py-24 bg-xala-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-xala-primary via-xala-secondary to-xala-primary opacity-90"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjEyMTIxIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-xala-accent mb-6">
            {section?.title || t('team.title')}
          </h2>
          <p className="text-xala-text/80 max-w-2xl mx-auto text-lg">
            {section?.description || t('team.description')}
          </p>
        </div>

        {renderContent()}
      </div>
    </section>
  );
};

export default Teams;