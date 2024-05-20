"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const { combine, splat, simple } = winston_1.default.format;
const { Console, File } = winston_1.default.transports;
const ignorePrivate = winston_1.default.format((info, opts) => {
    if (info.private) {
        return false;
    }
    return info;
});
winston_1.default.loggers.add('sil', {
    level: 'info',
    format: combine(ignorePrivate(), splat(), simple()),
    transports: [
        new Console(),
        // new File({filename: "info.log", level: 'info'}),
        // new File({filename: 'errors.log', level: 'error'})
    ],
});
