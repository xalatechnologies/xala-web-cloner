import { create } from 'zustand';
import { supabase } from '@/utils/supabase-client';

interface Document {
  id: string;
  content: string;
  metadata: Record<string, any>;
  similarity: number;
}

interface RagStore {
  documents: Document[];
  isLoading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
  reset: () => void;
}

export const useRagStore = create<RagStore>((set) => ({
  documents: [],
  isLoading: false,
  error: null,

  search: async (query: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.functions.invoke('rag-search', {
        body: { query }
      });

      if (error) throw error;
      set({ documents: data || [] });
    } catch (error) {
      console.error('Search error:', error);
      set({ error: 'Failed to search documents' });
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => {
    set({ documents: [], error: null });
  },
}));
