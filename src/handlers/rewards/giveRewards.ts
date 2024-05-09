import { SupabaseClient } from "@supabase/supabase-js";
import { getSpecificRows, insertData } from "../../database/supabase-operations/crud";
import { TaskMaster, TaskTable, TokenTable } from "../../models";

export const giveRewards = async (
  supabase: SupabaseClient,
  userId: string,
  taskType: number
) => {
  const response: {
    error: string | null;
    token: null | number;
    code: number;
  } = {
    code: 200,
    error: null,
    token: null,
  };
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

  // get task table for token count
  const { data: taskMasterData, error: taskMasterError } =
    await getSpecificRows<TaskMaster>(supabase, "tasks_master", "id", taskType);
  if (taskMasterData?.length === 0) {
    response.code = 400;
    response.error = `Error occured: No task with the given task id ${taskType} found`;
    return response;
  }
  if (taskMasterError) {
    response.code = 500;
    response.error = `Error occured: ${taskMasterError}`;
    return response;
  }

  // get token count related to task
  const token = taskMasterData![0].token;

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
    response.error = `Error occured: ${taskMasterError}`;
    return response;
  }
  response.token = token;
  return response;
};