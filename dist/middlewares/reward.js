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
exports.RewardMiddleWare = void 0;
const crud_1 = require("../database/supabase-operations/crud");
const utils_1 = require("../helpers/utils");
const getRewardsTypes = (supabase) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield (0, crud_1.getAllRows)(supabase, 'tasks_master');
    if (error) {
        return { data: null, error: error };
    }
    const taskMap = new Map();
    data === null || data === void 0 ? void 0 : data.forEach(item => taskMap.set(item.task, { id: item.id, token: item.token }));
    return { data: taskMap, error: null };
});
const RewardMiddleWare = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, utils_1.conlog)("Reward Middleware Triggered");
    const request = req;
    const { data, error } = yield getRewardsTypes(req.supabase);
    if (error) {
        const response = {
            code: 500,
            data: null,
            error: 'Something went wrong: ' + error
        };
        return res.status(404).send(response);
    }
    if (data.size === 0) {
        const response = {
            code: 404,
            data: null,
            error: "No Master Tasks are created"
        };
        return res.status(404).send(response);
    }
    request.taskMap = data;
    next();
});
exports.RewardMiddleWare = RewardMiddleWare;
