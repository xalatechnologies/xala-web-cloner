import type { Database } from '@/integrations/supabase/types';

export interface Section {
  id: string;
  title: string;
  description: string;
  rows?: number;
  columns?: number;
  status?: 'published' | 'draft';
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface GridConfig {
  initialRows?: number;
  cols?: number;
}

export interface BaseGridProps extends GridConfig {
  items: React.ReactNode[];
}

export type SupportedLanguage = Database['public']['Enums']['supported_language'];
