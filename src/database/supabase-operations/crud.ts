import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { SupabaseClient } from "@supabase/supabase-js";
import { ReturnObject } from "../../types";

// create

export async function insertData<T>(
  supabase: SupabaseClient,
  tableName: string,
  newData: any
) {
  const response: { data: T[] | null; error: any | null } = {
    data: null,
    error: null,
  };
  const { data, error } = await supabase.from(tableName).insert(newData);
  if (error) {
    response.error = error;
    return response;
  }
  response.data = data;
  return response;
}

// retrieve
/**
 * Retrieve all the rows of the table including the data from any foreign table if exist and if possible to retrieve
 * @param {string} tableName - Name of the table
 *
 * @returns {Object} Return object
 * @property {Array} data - Array of data from the table or null
 * @property {Object} error - Error or null
 */
export async function getFlatData(supabase: SupabaseClient, tableName: string) {
  const { data, error } = await supabase.rpc("check_foreign", {
    target_table_name: tableName,
  });
  const foreignList: string[] = data
    .filter((dataItem: any) => dataItem.is_foreign)
    .map((dataItem: any) => dataItem.column_name);
  const flatQuery = foreignList
    .map((item: any) => item + ":" + item)
    .join("(*),");
  const { data: flatData, error: flatError } = await supabase.from("bots")
    .select(`
      *, 
      ${flatQuery}
    `);
  if (flatError || error) {
    return { data: null, error: flatError?.message || error?.message };
  }
  return { data: flatData, error: null };
}

/**
 * Retrieve all the data rows of a table
 * @param tableName - Table name from which data to be fetched
 *
 * @returns {Object} Return object
 * @property {Array} data - Array of data from the table or null
 * @property {Object} error - Error or null
 */
export async function getAllRows<T>(
  supabase: SupabaseClient,
  tableName: string
) {
  const response: { data: T[] | null; error: any | null } = {
    data: null,
    error: null,
  };
  const { data, error } = await supabase.from(tableName).select()
  .order('id', {
    ascending: true
  });
  if (error) {
    response.error = error.message;
    return response;
  }
  response.data = data;
  return response;
}

/**
 * Retrieve specific data from a table. If array of column and values are used, rows with columns that matched the supplied values at the columns will be returned.
 * If not, rows with single column matching will be returned
 * @param {string} tableName - Table name from which data to be fetched
 * @param {string | string[]} columns - Column name or Array of column name to be used as a matching filter
 * @param {any | any[]} values - Value or Array of values for the columns to match
 * @returns {Object} Return object
 * @property {Array} data - Array of data from the table or null
 * @property {Object} error - Error or null
 */
export async function getSpecificRows<T>(
  supabase: SupabaseClient,
  tableName: string,
  columns: string | string[],
  values: any | any[]
) {
  const response: { data: T[] | null; error: any | null } = {
    data: null,
    error: null,
  };
  let query: PostgrestFilterBuilder<any, any, any[], string, unknown>;

  if (typeof columns === "string" && typeof values !== "object") {
    query = supabase.from(tableName).select().eq(columns, values);
    const { data, error } = await query;
    if (error) {
      response.error = error.message;
      return response;
    }
    response.data = data;
    return response;
  } else if (typeof columns === "object" && typeof values === "object") {
    query = supabase.from(tableName).select();
    columns.forEach((column, index) => {
      query.eq(column, values[index]);
    });
    const { data, error } = await query;
    if (error) {
      response.error = error.message;
      return response;
    }
    response.data = data;
    return response;
  }
  return response;
}

// update
export async function updateData<T>(
  supabase: SupabaseClient,
  tableName: string,
  updatedData: any,
  colName: string,
  colValue: any
) {
  const response: { data: T[] | null; error: any | null } = {
    data: null,
    error: null,
  };
  const { data, error } = await supabase
    .from(tableName)
    .update(updatedData)
    .eq(colName, colValue)
    .select();

  if (error) {
    response.error = error.message;
    return response;
  }
  response.data = data;
  return response;
}

// delete
export async function deleteData(supabase: SupabaseClient, tableName: string) {
  const response: { error: any | null } = {
    error: null,
  };
  const { error } = await supabase.from(tableName).delete().neq("id", 0);
  if (error) {
    response.error = error.message;
    return response;
  }
  return response;
}

// rpc
export async function runRpc<T>(
  supabase: SupabaseClient,
  rpc: string,
  args: Record<string, any> = {}
) {
  const response: { data: T[] | null; error: any | null } = {
    data: null,
    error: null,
  };
  if (Object.keys(args)) {
    const { data, error } = await supabase.rpc(rpc, args);
    if (error) {
      response.error = error.message;
      return response;
    }
    response.data = data;
    return response;
  }
  const { data, error } = await supabase.rpc(rpc);
  if (error) {
    response.error = error.message;
    return response;
  }
  response.data = data;
  return response;
}

// for ko htoo myat
// export async function getMetaData() {
//   const age = getAllRows('age')
//   const gender = getAllRows('gender')
//   const interest = getAllRows('interests')
//   const [ageResponse, genderResponse, interestResponse] = await Promise.all([age, gender, interest])
//   const response = {
//     genderData: genderResponse.data,
//     genderError: genderResponse.error,
//     ageData: ageResponse.data,
//     ageError: ageResponse.error,
//     interestData: interestResponse.data,
//     interestError: interestResponse.error,
//   }
//   return response
// }
