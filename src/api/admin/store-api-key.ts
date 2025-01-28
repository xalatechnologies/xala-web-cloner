import { supabase } from '@/integrations/supabase/client';

export async function storeAPIKey(name: string, keyValue: string) {
  try {
    const { data, error } = await supabase
      .from('api_keys')
      .upsert(
        {
          name,
          key_value: keyValue,
          updated_at: new Date().toISOString()
        },
        {
          onConflict: 'name'
        }
      );

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Failed to store API key:', error);
    throw error;
  }
}
