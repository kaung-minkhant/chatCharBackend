import { NextFunction, Request, Response } from "express";
import userSessions from "../helpers/userSessions";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { AuthRequestObject } from "./type";
import { conlog } from "../helpers/utils";
import { UserSessionCache } from "../helpers/types";
import { ControllerResponseObject } from "../controllers/types";

dotenv.config();

async function getUser(jwt: string) {
  const supabaseInstance = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_ANON_KEY || "",
    {
      global: {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    }
  );
  const { data, error } = await supabaseInstance.auth.getUser(jwt);
  if (error) return { data: null, error: error.message, supabaseInstance: null };
  return { data, error: null, supabaseInstance };
}

export const AuthMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const request: AuthRequestObject = req;
  const jwtString = ( request.headers["authorization"] || request.headers["Authorization"] || "" ) as string;
  const jwt = jwtString.split(' ')[1]
  conlog("Token", jwt)
  const response: ControllerResponseObject = {
    data: null,
    error: null,
  };
  if (!jwt) {
    response.error = "You are not authorized";
    return res.status(401).send(response);
  }
  try {
    if (userSessions.has(jwt)) {
      const data = userSessions.get<UserSessionCache>(jwt);
      conlog("Using cache");
      request.supabase = data?.supabase;
      request.user = data?.user;
    } else {
      const { data, error, supabaseInstance } = await getUser(jwt);
      if (error) {
        response.error = error;
        return res.status(401).send(response);
      }
      userSessions.set<UserSessionCache>(jwt, {
        supabase: supabaseInstance!,
        user: data!.user,
      });
      request.supabase = supabaseInstance!;
      request.user = data!.user;
    }
    next();
  } catch (error) {
    response.error = "Something went wrong processing jwt: " + error
    return res.status(500).send(response);
  }
};
