"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleWare = void 0;
function LoggerMiddleWare(req, res, next) {
    const request = req;
    request.time = new Date(Date.now()).toString();
    console.log(request.method, request.hostname, request.path, request.time);
    next();
}
exports.LoggerMiddleWare = LoggerMiddleWare;
