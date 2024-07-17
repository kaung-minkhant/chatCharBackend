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
  if (error)
    return { data: null, error: error.message, supabaseInstance: null };
  return { data, error: null, supabaseInstance };
}

export const AuthMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const request: AuthRequestObject = req;
  const jwtString = (request.headers["authorization"] ||
    request.headers["Authorization"] ||
    "") as string;
  const splitCount = jwtString.split(" ");
  const response: ControllerResponseObject = {
    data: null,
    error: null,
  };
  if (splitCount.length !== 2) {
    response.error =
      "Authorization token fomat is wrong: It should be Bearer <token>";
    return res.status(400).send(response);
  }
  const jwt = splitCount[1];
  if (!jwt) {
    response.error = "You are not authorized";
    return res.status(401).send(response);
  }
  const jwtBody = jwt.split(".")[1];
  const exp = JSON.parse(Buffer.from(jwtBody, "base64").toString("utf-8")).exp;
  let newJwt: string | null = null;
  if (exp - Date.now() / 1000 < 60 * 5) {
    // expiring in 5 min
    if (process.env.AUTH_ENDPOINT) {
      const refreshResponse = await fetch(
        process.env.AUTH_ENDPOINT + "/refresh",
        {
          method: "get",
          headers: {
            Authorization: `bearer ${jwt}`,
          },
        }
      );
      const data = await refreshResponse.json();
      if (!data.error) {
        newJwt = data.data.session.access_token;
      } else {
        response.error =
          "Something went wrong processing jwt: " + data.error.message;
        return res.status(response.error.status!).send(response);
      }
    }
  }
  try {
    if (userSessions.has(jwt)) {
      if (newJwt) {
        userSessions.del(jwt);
        const { data, error, supabaseInstance } = await getUser(newJwt);
        if (error) {
          response.error = error;
          return res.status(401).send(response);
        }
        userSessions.set<UserSessionCache>(newJwt, {
          supabase: supabaseInstance!,
          user: data!.user,
        });
      }
      conlog("Using cache");
      const data = userSessions.get<UserSessionCache>(newJwt ?? jwt);
      request.supabase = data?.supabase;
      request.user = data?.user;
      if (newJwt) request.newJwt = newJwt;
    } else {
      const { data, error, supabaseInstance } = await getUser(newJwt ?? jwt);
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
      if (newJwt) request.newJwt = newJwt;
    }
    next();
  } catch (error) {
    response.error = "Something went wrong processing jwt: " + error;
    return res.status(500).send(response);
  }
};
