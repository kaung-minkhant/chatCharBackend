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
exports.getBalance = void 0;
const crud_1 = require("../../database/supabase-operations/crud");
const getBalance = (supabase) => __awaiter(void 0, void 0, void 0, function* () {
    const response = {
        code: 200,
        data: null,
        error: null,
    };
    const { data, error } = yield (0, crud_1.runRpc)(supabase, 'check_balance');
    if (error) {
        response.code = 500;
        response.error = error;
        return response;
    }
    response.data = { balance: data };
    return response;
});
exports.getBalance = getBalance;
