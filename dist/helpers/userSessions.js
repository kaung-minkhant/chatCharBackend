"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cache_1 = __importDefault(require("node-cache"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// conlog('User session expiry', process.env.USER_SESSION_EXPIRY)
const userSessions = new node_cache_1.default({
    stdTTL: parseInt(process.env.USER_SESSION_EXPIRY || '5') * 60,
    checkperiod: 1,
    useClones: false,
    deleteOnExpire: true
});
exports.default = userSessions;
