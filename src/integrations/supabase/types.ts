export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      album_tracks: {
        Row: {
          album_id: string
          created_at: string
          id: string
          position: number
          title: string
          youtube_url: string
        }
        Insert: {
          album_id: string
          created_at?: string
          id?: string
          position?: number
          title: string
          youtube_url: string
        }
        Update: {
          album_id?: string
          created_at?: string
          id?: string
          position?: number
          title?: string
          youtube_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "album_tracks_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "albums"
            referencedColumns: ["id"]
          },
        ]
      }
      albums: {
        Row: {
          cover_color: string
          created_at: string
          id: string
          title: string
        }
        Insert: {
          cover_color?: string
          created_at?: string
          id?: string
          title: string
        }
        Update: {
          cover_color?: string
          created_at?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string
          content: string
          created_at: string
          id: string
          image_url: string | null
          title: string
        }
        Insert: {
          author?: string
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          title: string
        }
        Update: {
          author?: string
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          title?: string
        }
        Relationships: []
      }
      book_reviews: {
        Row: {
          book_id: string
          book_type: string
          comment: string
          created_at: string
          id: string
          rating: number
          reader_name: string
        }
        Insert: {
          book_id: string
          book_type: string
          comment: string
          created_at?: string
          id?: string
          rating: number
          reader_name: string
        }
        Update: {
          book_id?: string
          book_type?: string
          comment?: string
          created_at?: string
          id?: string
          rating?: number
          reader_name?: string
        }
        Relationships: []
      }
      community_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          user_id: string
          user_name: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          user_id: string
          user_name?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          content: string
          created_at: string
          id: string
          likes_count: number
          user_id: string
          user_name: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          likes_count?: number
          user_id: string
          user_name?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          likes_count?: number
          user_id?: string
          user_name?: string
        }
        Relationships: []
      }
      course_categories: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      course_videos: {
        Row: {
          category_id: string
          created_at: string
          description: string
          id: string
          position: number
          title: string
          youtube_id: string
        }
        Insert: {
          category_id: string
          created_at?: string
          description?: string
          id?: string
          position?: number
          title: string
          youtube_id: string
        }
        Update: {
          category_id?: string
          created_at?: string
          description?: string
          id?: string
          position?: number
          title?: string
          youtube_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_videos_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "course_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      discounts: {
        Row: {
          active: boolean
          coupon_code: string
          course_ids: string[]
          created_at: string
          description: string
          expires_at: string
          id: string
          percentage: number
          title: string
        }
        Insert: {
          active?: boolean
          coupon_code: string
          course_ids?: string[]
          created_at?: string
          description?: string
          expires_at: string
          id?: string
          percentage?: number
          title: string
        }
        Update: {
          active?: boolean
          coupon_code?: string
          course_ids?: string[]
          created_at?: string
          description?: string
          expires_at?: string
          id?: string
          percentage?: number
          title?: string
        }
        Relationships: []
      }
      ebooks: {
        Row: {
          author: string
          cover_url: string | null
          created_at: string
          description: string
          id: string
          pages: number
          title: string
          url: string
          video_url: string | null
        }
        Insert: {
          author?: string
          cover_url?: string | null
          created_at?: string
          description?: string
          id?: string
          pages?: number
          title: string
          url?: string
          video_url?: string | null
        }
        Update: {
          author?: string
          cover_url?: string | null
          created_at?: string
          description?: string
          id?: string
          pages?: number
          title?: string
          url?: string
          video_url?: string | null
        }
        Relationships: []
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      legacy_active_users: {
        Row: {
          cancelled_at: string | null
          course_name: string | null
          email: string
          enrolled_at: string | null
          enrollment_status: string | null
          expires_at: string | null
          external_id: string | null
          id: string
          imported_at: string
          last_access_at: string | null
          name: string | null
          phone: string | null
          watched_percentage: number | null
        }
        Insert: {
          cancelled_at?: string | null
          course_name?: string | null
          email: string
          enrolled_at?: string | null
          enrollment_status?: string | null
          expires_at?: string | null
          external_id?: string | null
          id?: string
          imported_at?: string
          last_access_at?: string | null
          name?: string | null
          phone?: string | null
          watched_percentage?: number | null
        }
        Update: {
          cancelled_at?: string | null
          course_name?: string | null
          email?: string
          enrolled_at?: string | null
          enrollment_status?: string | null
          expires_at?: string | null
          external_id?: string | null
          id?: string
          imported_at?: string
          last_access_at?: string | null
          name?: string | null
          phone?: string | null
          watched_percentage?: number | null
        }
        Relationships: []
      }
      livros: {
        Row: {
          author: string
          created_at: string
          description: string
          id: string
          pages: number
          title: string
          url: string
        }
        Insert: {
          author?: string
          created_at?: string
          description?: string
          id?: string
          pages?: number
          title: string
          url?: string
        }
        Update: {
          author?: string
          created_at?: string
          description?: string
          id?: string
          pages?: number
          title?: string
          url?: string
        }
        Relationships: []
      }
      materials: {
        Row: {
          created_at: string
          id: string
          size: string
          title: string
          type: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          size?: string
          title: string
          type?: string
          url?: string
        }
        Update: {
          created_at?: string
          id?: string
          size?: string
          title?: string
          type?: string
          url?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          metadata: Json | null
          read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          metadata?: Json | null
          read?: boolean
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          metadata?: Json | null
          read?: boolean
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      user_video_views: {
        Row: {
          id: string
          user_id: string
          video_id: string
          watched_at: string
        }
        Insert: {
          id?: string
          user_id: string
          video_id: string
          watched_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          video_id?: string
          watched_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
