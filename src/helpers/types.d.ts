import { SupabaseClient } from "@supabase/supabase-js";

export interface UserSessionCache {
  supabase: SupabaseClient,
  user: any
}