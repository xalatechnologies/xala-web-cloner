import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";

export const useSection = (sectionName: string) => {
  const { i18n } = useTranslation();

  return useQuery({
    queryKey: ['section', sectionName, i18n.language],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sections')
        .select('*')
        .eq('section_name', sectionName)
        .eq('language', i18n.language.toLowerCase())
        .single();

      if (error) {
        console.error('Error fetching section:', error);
        throw error;
      }

      return data;
    },
  });
};