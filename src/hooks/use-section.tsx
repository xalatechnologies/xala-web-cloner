import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";
import { type Database } from "@/integrations/supabase/types";

export const useSection = (sectionName: string) => {
  const { i18n } = useTranslation();

  return useQuery({
    queryKey: ['section', sectionName, i18n.language],
    queryFn: async () => {
      const currentLanguage = i18n.language.toLowerCase() as Database['public']['Enums']['supported_language'];
      console.log('Fetching section for language:', currentLanguage);
      
      const { data, error } = await supabase
        .from('sections')
        .select('*')
        .eq('section_name', sectionName)
        .eq('language', currentLanguage)
        .single();

      if (error) {
        console.error('Error fetching section:', error);
        throw error;
      }

      return data;
    },
  });
};