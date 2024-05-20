"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatZodIssuesWithPath = exports.conlog = void 0;
function conlog(label, value) {
    console.log(label + (value !== undefined ? " >> " : ""));
    if (value !== undefined) {
        console.log(value);
    }
}
exports.conlog = conlog;
function formatZodIssuesWithPath(issues, possibleErrorKeys, map = true) {
    const errorMap = new Map();
    issues.forEach((issue) => {
        const intersection = arrayInterset(possibleErrorKeys, issue.path);
        if (intersection) {
            errorMap.set(intersection, issue.message);
        }
    });
    if (map) {
        return errorMap;
    }
    return mapToObject(errorMap);
}
exports.formatZodIssuesWithPath = formatZodIssuesWithPath;
function arrayInterset(arr1, arr2) {
    const intersection = arr1.filter((item) => arr2.includes(item))[0];
    return intersection;
}
function mapToObject(map) {
    const data = {};
    map.forEach((mapItem, mapKey) => {
        data[mapKey] = mapItem;
    });
    return data;
}
