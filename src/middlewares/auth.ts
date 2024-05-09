import { NextFunction, Request, Response } from "express";
import userSessions from "../helpers/userSessions";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { AuthRequestObject } from "./type";
import { conlog } from "../helpers/utils";
import { UserSessionCache } from "../helpers/types";

dotenv.config();

async function getUser(jwt: string, refreshToken: string) {
  const supabaseInstance = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_ANON_KEY || "",
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    }
  );
  const { data, error } = await supabaseInstance.auth.setSession({
    access_token: jwt,
    refresh_token: refreshToken
  });
  if (error) return { data: null, error };
  return { data, error: null, supabaseInstance };
}

export const AuthMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const request: AuthRequestObject = req;
  // TODO: change this to match what ako sent in viber
  const tokens = request.cookies['sb-'+process.env.PROJECT_ID+'-auth-token'] as string
  const sanitizedToken = tokens.slice(1, tokens.length-1).split(',')
  const jwt = sanitizedToken[0]
  const refreshToken = sanitizedToken[1]
  if (!jwt) {
    return res.status(401).send({ error: "You are not authorized" });
  }
  try {
    if (userSessions.has(jwt)) {
      const data = userSessions.get<UserSessionCache>(jwt);
      conlog("Here");
      request.supabase = data?.supabase;
      request.user = data?.user;
    } else {
      const { data, error, supabaseInstance } = await getUser(jwt, refreshToken);
      if (error) {
        return res.status(401).send({ error: "You are not authorized" });
      }
      userSessions.set<UserSessionCache>(jwt, {
        supabase: supabaseInstance,
        user: data.user,
      });
      request.supabase = supabaseInstance;
      request.user = data.user!;
    }
    next();
  } catch (error) {
    return res.status(500).send({
      error: "Something went wrong processing jwt" + error,
    });
  }
};
