"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const { prettyPrint, simple, colorize, splat, label, timestamp, printf, errors, combine, json } = winston_1.default.format;
const { Console, File } = winston_1.default.transports;
const myFormat = printf(({ level, label, message, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
winston_1.default.loggers.add('exampleLogger', {
    level: 'info',
    format: combine(
    // colorize(),
    simple(), errors({ stack: true }), splat(), timestamp(), label({ label: 'Example Service' }), myFormat),
    transports: [
        new Console(),
        new File({ filename: "info.log", level: 'info' }),
        new File({ filename: 'errors.log', level: 'error' })
    ],
});
