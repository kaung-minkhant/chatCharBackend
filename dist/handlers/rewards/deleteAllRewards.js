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
exports.deleteAllRewards = void 0;
const crud_1 = require("../../database/supabase-operations/crud");
const deleteAllRewards = (supabase) => __awaiter(void 0, void 0, void 0, function* () {
    const response = {
        code: 200,
        data: null,
        error: null,
    };
    const { error: taskError } = yield (0, crud_1.deleteData)(supabase, 'task_table');
    if (taskError) {
        response.code = 500;
        response.error = taskError;
        return response;
    }
    const { error: tokenError } = yield (0, crud_1.deleteData)(supabase, 'token_table');
    if (tokenError) {
        response.code = 500;
        response.error = tokenError;
        return response;
    }
    return response;
});
exports.deleteAllRewards = deleteAllRewards;
