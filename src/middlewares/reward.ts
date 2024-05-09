import { NextFunction, Request, Response } from "express";
import { AuthRequestObject, TaskRequestObject } from "./type";
import { getAllRows } from "../database/supabase-operations/crud";
import { SupabaseClient } from "@supabase/supabase-js";
import { conlog } from "../helpers/utils";
import { TaskMaster } from "../models";

const getRewardsTypes = async (supabase: SupabaseClient) => {
  const {data, error} = await getAllRows<TaskMaster>(supabase, 'tasks_master')
  const taskMap = new Map()
  data?.forEach(item => taskMap.set(item.task, item.id))
  return taskMap
}

export const RewardMiddleWare = async (
  req: AuthRequestObject,
  res: Response,
  next: NextFunction
) => { 
  const request: TaskRequestObject = req
  const taskMap = await getRewardsTypes(req.supabase!)
  request.taskMap = taskMap;
  next();
}