import { NextFunction, Request, Response } from "express";
import { AuthRequestObject, RewardRequestObject } from "./type";
import { getAllRows } from "../database/supabase-operations/crud";
import { SupabaseClient } from "@supabase/supabase-js";
import { conlog } from "../helpers/utils";
import { TaskMasterType } from "../models";
import { ReturnObject } from "../types";
import { ControllerResponseObject } from "../controllers/types";

const getRewardsTypes = async (supabase: SupabaseClient): Promise<ReturnObject> => {
  const {data, error} = await getAllRows<TaskMasterType>(supabase, 'tasks_master')
  if (error) {
    return {data: null, error: error}
  }
  const taskMap = new Map<string, {id: number, token: number}>()
  data?.forEach(item => taskMap.set(item.task, {id: item.id!, token: item.token}))
  return {data: taskMap, error: null}
}

export const RewardMiddleWare = async (
  req: AuthRequestObject,
  res: Response,
  next: NextFunction
) => { 
  conlog("Reward Middleware Triggered")
  const request: RewardRequestObject = req
  const {data, error} = await getRewardsTypes(req.supabase!)
  if (error) {
    const response: ControllerResponseObject = {
      code: 500,
      data: null,
      error: 'Something went wrong: ' + error
    }
    return res.status(404).send(response)
  }
  if (data.size === 0) {
    const response: ControllerResponseObject = {
      code: 404,
      data: null,
      error: "No Master Tasks are created"
    }
    return res.status(404).send(response)
  }
  request.taskMap = data;
  next();
}