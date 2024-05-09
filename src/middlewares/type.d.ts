import { SupabaseClient, User } from "@supabase/supabase-js";
import {  } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import { Request } from "express";

export interface AuthRequestObject extends Request {
  supabase?: SupabaseClient,
  user?: User;
}

export interface TaskRequestObject extends AuthRequestObject {
  taskMap?: Map<string, number>;
}