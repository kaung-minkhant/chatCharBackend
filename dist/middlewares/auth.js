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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleWare = void 0;
const userSessions_1 = __importDefault(require("../helpers/userSessions"));
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("../helpers/utils");
dotenv_1.default.config();
function getUser(jwt) {
    return __awaiter(this, void 0, void 0, function* () {
        const supabaseInstance = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL || "", process.env.SUPABASE_ANON_KEY || "", {
            global: {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        });
        const { data, error } = yield supabaseInstance.auth.getUser(jwt);
        if (error)
            return { data: null, error: error.message, supabaseInstance: null };
        return { data, error: null, supabaseInstance };
    });
}
const AuthMiddleWare = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req;
    const jwt = (request.headers["authorization"] || request.headers["Authorization"] || "");
    (0, utils_1.conlog)("Token", jwt);
    const response = {
        data: null,
        error: null,
        code: 200,
    };
    if (!jwt) {
        response.code = 401;
        response.error = "You are not authorized";
        return res.status(401).send(response);
    }
    try {
        if (userSessions_1.default.has(jwt)) {
            const data = userSessions_1.default.get(jwt);
            (0, utils_1.conlog)("Using cache");
            request.supabase = data === null || data === void 0 ? void 0 : data.supabase;
            request.user = data === null || data === void 0 ? void 0 : data.user;
        }
        else {
            const { data, error, supabaseInstance } = yield getUser(jwt);
            if (error) {
                response.code = 401;
                response.error = error;
                return res.status(401).send(response);
            }
            userSessions_1.default.set(jwt, {
                supabase: supabaseInstance,
                user: data.user,
            });
            request.supabase = supabaseInstance;
            request.user = data.user;
        }
        next();
    }
    catch (error) {
        response.code = 500;
        response.error = "Something went wrong processing jwt: " + error;
        return res.status(500).send(response);
    }
});
exports.AuthMiddleWare = AuthMiddleWare;
