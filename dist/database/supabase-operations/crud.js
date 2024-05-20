"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runRpc = exports.deleteData = exports.updateData = exports.getSpecificRows = exports.getAllRows = exports.getFlatData = exports.insertData = void 0;
// create
function insertData(supabase, tableName, newData) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = {
            data: null,
            error: null,
        };
        const { data, error } = yield supabase.from(tableName).insert(newData);
        if (error) {
            response.error = error;
            return response;
        }
        response.data = data;
        return response;
    });
}
exports.insertData = insertData;
// retrieve
/**
 * Retrieve all the rows of the table including the data from any foreign table if exist and if possible to retrieve
 * @param {string} tableName - Name of the table
 *
 * @returns {Object} Return object
 * @property {Array} data - Array of data from the table or null
 * @property {Object} error - Error or null
 */
function getFlatData(supabase, tableName) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabase.rpc("check_foreign", {
            target_table_name: tableName,
        });
        const foreignList = data
            .filter((dataItem) => dataItem.is_foreign)
            .map((dataItem) => dataItem.column_name);
        const flatQuery = foreignList
            .map((item) => item + ":" + item)
            .join("(*),");
        const { data: flatData, error: flatError } = yield supabase.from("bots")
            .select(`
      *, 
      ${flatQuery}
    `);
        if (flatError || error) {
            return { data: null, error: (flatError === null || flatError === void 0 ? void 0 : flatError.message) || (error === null || error === void 0 ? void 0 : error.message) };
        }
        return { data: flatData, error: null };
    });
}
exports.getFlatData = getFlatData;
/**
 * Retrieve all the data rows of a table
 * @param tableName - Table name from which data to be fetched
 *
 * @returns {Object} Return object
 * @property {Array} data - Array of data from the table or null
 * @property {Object} error - Error or null
 */
function getAllRows(supabase, tableName) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = {
            data: null,
            error: null,
        };
        const { data, error } = yield supabase.from(tableName).select()
            .order('id', {
            ascending: true
        });
        if (error) {
            response.error = error.message;
            return response;
        }
        response.data = data;
        return response;
    });
}
exports.getAllRows = getAllRows;
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
function getSpecificRows(supabase, tableName, columns, values) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = {
            data: null,
            error: null,
        };
        let query;
        if (typeof columns === "string" && typeof values !== "object") {
            query = supabase.from(tableName).select().eq(columns, values);
            const { data, error } = yield query;
            if (error) {
                response.error = error.message;
                return response;
            }
            response.data = data;
            return response;
        }
        else if (typeof columns === "object" && typeof values === "object") {
            query = supabase.from(tableName).select();
            columns.forEach((column, index) => {
                query.eq(column, values[index]);
            });
            const { data, error } = yield query;
            if (error) {
                response.error = error.message;
                return response;
            }
            response.data = data;
            return response;
        }
        return response;
    });
}
exports.getSpecificRows = getSpecificRows;
// update
function updateData(supabase, tableName, updatedData, colName, colValue) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = {
            data: null,
            error: null,
        };
        const { data, error } = yield supabase
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
    });
}
exports.updateData = updateData;
// delete
function deleteData(supabase, tableName) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = {
            error: null,
        };
        const { error } = yield supabase.from(tableName).delete().neq("id", 0);
        if (error) {
            response.error = error.message;
            return response;
        }
        return response;
    });
}
exports.deleteData = deleteData;
// rpc
function runRpc(supabase_1, rpc_1) {
    return __awaiter(this, arguments, void 0, function* (supabase, rpc, args = {}) {
        const response = {
            data: null,
            error: null,
        };
        if (Object.keys(args)) {
            const { data, error } = yield supabase.rpc(rpc, args);
            if (error) {
                response.error = error.message;
                return response;
            }
            response.data = data;
            return response;
        }
        const { data, error } = yield supabase.rpc(rpc);
        if (error) {
            response.error = error.message;
            return response;
        }
        response.data = data;
        return response;
    });
}
exports.runRpc = runRpc;
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
