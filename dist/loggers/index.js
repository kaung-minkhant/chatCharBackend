"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SILogger = exports.ExampleLogger = void 0;
require("./exampleLogger");
require("./stringInterploatedLogger");
const winston_1 = __importDefault(require("winston"));
winston_1.default.exceptions.handle(new winston_1.default.transports.Console(), new winston_1.default.transports.File({ filename: 'exceptions.log' }));
winston_1.default.rejections.handle(new winston_1.default.transports.Console(), new winston_1.default.transports.File({ filename: 'rejections.log' }));
winston_1.default.exitOnError = false;
exports.ExampleLogger = winston_1.default.loggers.get('exampleLogger');
exports.ExampleLogger.exitOnError = false;
exports.SILogger = winston_1.default.loggers.get('sil');
