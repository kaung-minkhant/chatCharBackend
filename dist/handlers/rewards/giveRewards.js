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
exports.giveRewards = void 0;
const crud_1 = require("../../database/supabase-operations/crud");
const giveRewards = (supabase, userId, taskType, token) => __awaiter(void 0, void 0, void 0, function* () {
    const response = {
        code: 200,
        data: null,
        error: null,
    };
    try {
        // check if reward is given
        const { data: rewardData, error: rewardError } = yield (0, crud_1.getSpecificRows)(supabase, "token_table", ["user_id", "task_type"], [userId, taskType]);
        if (rewardError) {
            response.code = 500;
            response.error = `Error occured: ${rewardError}`;
            return response;
        }
        if (rewardData === null || rewardData === void 0 ? void 0 : rewardData.length) {
            response.code = 400;
            response.error = `Error occured: Reward Given`;
            return response;
        }
        // insert into task table with correct token
        const newData = {
            complete: true,
            token: token,
            type: taskType,
            user_id: userId,
        };
        const { error: taskError } = yield (0, crud_1.insertData)(supabase, "task_table", newData);
        if (taskError) {
            response.code = 500;
            response.error = `Error occured: ${taskError}`;
            return response;
        }
        response.data = { token };
        return response;
    }
    catch (error) {
        response.code = 500;
        response.error = error;
        return response;
    }
});
exports.giveRewards = giveRewards;
