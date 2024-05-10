import { SupabaseClient } from "@supabase/supabase-js";
import { getSpecificRows, insertData } from "../../database/supabase-operations/crud";
import { TaskTable, TokenTable } from "../../models";
import { HandlerReturnObject } from "../types";

export const giveRewards = async (
  supabase: SupabaseClient,
  userId: string,
  taskType: number,
  token: number
) => {
  const response: HandlerReturnObject = {
    code: 200,
    data: null,
    error: null,
  }

  // check if reward is given
  const { data: rewardData, error: rewardError } =
    await getSpecificRows<TokenTable>(
      supabase,
      "token_table",
      ["user_id", "task_type"],
      [userId, taskType]
    );
  if (rewardError) {
    response.code = 500;
    response.error = `Error occured: ${rewardError}`;
    return response;
  }
  if (rewardData?.length) {
    response.code = 400;
    response.error = `Error occured: Reward Given`;
    return response;
  }

  // insert into task table with correct token
  const newData: TaskTable = {
    complete: true,
    token: token,
    type: taskType,
    user_id: userId,
  };
  const { error: taskError } = await insertData<TaskTable>(
    supabase,
    "task_table",
    newData
  );
  if (taskError) {
    response.code = 500;
    response.error = `Error occured: ${taskError}`;
    return response;
  }
  response.data = {token};
  return response;
};