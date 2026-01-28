export interface Database {
  public: {
    Tables: {
      interviews: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          status: 'in_progress' | 'completed';
          answers: Record<number, string>;
          business_plan: string | null;
          email: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          status?: 'in_progress' | 'completed';
          answers?: Record<number, string>;
          business_plan?: string | null;
          email?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          status?: 'in_progress' | 'completed';
          answers?: Record<number, string>;
          business_plan?: string | null;
          email?: string | null;
        };
      };
    };
  };
}

export type Interview = Database['public']['Tables']['interviews']['Row'];
export type InterviewInsert = Database['public']['Tables']['interviews']['Insert'];
export type InterviewUpdate = Database['public']['Tables']['interviews']['Update'];
