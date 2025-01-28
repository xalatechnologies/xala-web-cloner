export interface TechnologyTool {
  id: string;
  name: string;
  description: string;
  technology_id: string;
  language: 'en' | 'no';
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Technology {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  language: 'en' | 'no';
  sort_order: number;
  created_at: string;
  updated_at: string;
  technology_tools: TechnologyTool[];
}