export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      about_features: {
        Row: {
          created_at: string | null
          description: string
          icon: string
          id: string
          language: Database["public"]["Enums"]["supported_language"]
          sort_order: number
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          icon: string
          id?: string
          language?: Database["public"]["Enums"]["supported_language"]
          sort_order?: number
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          icon?: string
          id?: string
          language?: Database["public"]["Enums"]["supported_language"]
          sort_order?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      case_studies: {
        Row: {
          created_at: string | null
          description: string
          icon: string
          id: string
          image_url: string
          language: Database["public"]["Enums"]["supported_language"]
          metrics: string | null
          sort_order: number
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          icon: string
          id?: string
          image_url: string
          language?: Database["public"]["Enums"]["supported_language"]
          metrics?: string | null
          sort_order?: number
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          icon?: string
          id?: string
          image_url?: string
          language?: Database["public"]["Enums"]["supported_language"]
          metrics?: string | null
          sort_order?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          language: Database["public"]["Enums"]["supported_language"]
          logo_url: string
          name: string
          sort_order: number
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          language?: Database["public"]["Enums"]["supported_language"]
          logo_url: string
          name: string
          sort_order?: number
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          language?: Database["public"]["Enums"]["supported_language"]
          logo_url?: string
          name?: string
          sort_order?: number
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string | null
          email: string
          id: string
          language: Database["public"]["Enums"]["supported_language"]
          message: string
          name: string
          status: string | null
          subject: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          language?: Database["public"]["Enums"]["supported_language"]
          message: string
          name: string
          status?: string | null
          subject: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          language?: Database["public"]["Enums"]["supported_language"]
          message?: string
          name?: string
          status?: string | null
          subject?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      menu_items: {
        Row: {
          created_at: string | null
          href: string
          id: string
          language: Database["public"]["Enums"]["supported_language"]
          name: string
          parent_id: string | null
          sort_order: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          href: string
          id?: string
          language?: Database["public"]["Enums"]["supported_language"]
          name: string
          parent_id?: string | null
          sort_order?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          href?: string
          id?: string
          language?: Database["public"]["Enums"]["supported_language"]
          name?: string
          parent_id?: string | null
          sort_order?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menu_items_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string | null
          description: string
          icon: string | null
          id: string
          image_url: string
          language: Database["public"]["Enums"]["supported_language"]
          metrics: string | null
          sort_order: number
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          icon?: string | null
          id?: string
          image_url: string
          language?: Database["public"]["Enums"]["supported_language"]
          metrics?: string | null
          sort_order?: number
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          icon?: string | null
          id?: string
          image_url?: string
          language?: Database["public"]["Enums"]["supported_language"]
          metrics?: string | null
          sort_order?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      sections: {
        Row: {
          background: string | null
          created_at: string | null
          description: string | null
          id: string
          language: Database["public"]["Enums"]["supported_language"]
          section_name: string
          sort_order: number
          title: string
          updated_at: string | null
        }
        Insert: {
          background?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          language?: Database["public"]["Enums"]["supported_language"]
          section_name: string
          sort_order?: number
          title: string
          updated_at?: string | null
        }
        Update: {
          background?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          language?: Database["public"]["Enums"]["supported_language"]
          section_name?: string
          sort_order?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          created_at: string | null
          description: string | null
          email: string
          id: string
          image_url: string
          language: Database["public"]["Enums"]["supported_language"]
          linkedin_url: string | null
          name: string
          role: string
          sort_order: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          email: string
          id?: string
          image_url: string
          language?: Database["public"]["Enums"]["supported_language"]
          linkedin_url?: string | null
          name: string
          role: string
          sort_order?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          email?: string
          id?: string
          image_url?: string
          language?: Database["public"]["Enums"]["supported_language"]
          linkedin_url?: string | null
          name?: string
          role?: string
          sort_order?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      technologies: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          icon: string
          id: string
          language: Database["public"]["Enums"]["supported_language"]
          sort_order: number
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          icon: string
          id?: string
          language?: Database["public"]["Enums"]["supported_language"]
          sort_order?: number
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          icon?: string
          id?: string
          language?: Database["public"]["Enums"]["supported_language"]
          sort_order?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      technology_tools: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          language: Database["public"]["Enums"]["supported_language"]
          name: string
          sort_order: number
          technology_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          language?: Database["public"]["Enums"]["supported_language"]
          name: string
          sort_order?: number
          technology_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          language?: Database["public"]["Enums"]["supported_language"]
          name?: string
          sort_order?: number
          technology_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "technology_tools_technology_id_fkey"
            columns: ["technology_id"]
            isOneToOne: false
            referencedRelation: "technologies"
            referencedColumns: ["id"]
          },
        ]
      }
      work_processes: {
        Row: {
          created_at: string | null
          description: string
          icon: string
          id: string
          language: Database["public"]["Enums"]["supported_language"]
          sort_order: number
          step_number: number
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          icon: string
          id?: string
          language?: Database["public"]["Enums"]["supported_language"]
          sort_order?: number
          step_number: number
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          icon?: string
          id?: string
          language?: Database["public"]["Enums"]["supported_language"]
          sort_order?: number
          step_number?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      supported_language: "en" | "no"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
