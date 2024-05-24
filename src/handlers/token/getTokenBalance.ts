import { SupabaseClient } from "@supabase/supabase-js";
import {HandlerReturnObject} from '../types'
import { runRpc } from "../../database/supabase-operations/crud";

export const getTokenBalance = async (supabase: SupabaseClient) => {
  const response: HandlerReturnObject = {
    code: 200,
    data: null,
    error: null,
  }
  const {data, error} = await runRpc<number>(supabase, 'check_balance');
  if (error) {
    response.code = 500
    response.error = error
    return response
  }
  response.data = {balance: data}
  return response
}