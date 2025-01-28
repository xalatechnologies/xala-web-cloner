import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Language } from '@/types/chat';

export function FeatureCards() {
  const { data: features } = useQuery({
    queryKey: ['features'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('about_features')
        .select('*')
        .eq('language', 'en' as Language)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  if (!features) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature) => (
        <div
          key={feature.id}
          className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl">{feature.icon}</span>
            <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
          </div>
          <p className="text-white/70">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}