import { SupabaseClient } from "@supabase/supabase-js"
import { deleteData } from "../../database/supabase-operations/crud"
import { HandlerReturnObject } from "../types"

export const deleteAllRewards = async (supabase: SupabaseClient) => {
  const response: HandlerReturnObject = {
    code: 200,
    data: null,
    error: null,
  }
  const {error: taskError} = await deleteData(supabase, 'task_table')
  if (taskError) {
    response.code = 500
    response.error = taskError
    return response
  }
  const {error: tokenError} = await deleteData(supabase, 'token_table')
  if (tokenError) {
    response.code = 500
    response.error = tokenError
    return response
  }
  return response
}