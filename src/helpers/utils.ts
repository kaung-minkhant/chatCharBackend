import { ZodIssue } from "zod";

export function conlog(label: string, value?: any) {
  console.log(label + (value !== undefined ? " >> " : ""));
  if (value !== undefined) {
    console.log(value);
  }
}

export function formatZodIssuesWithPath(
  issues: ZodIssue[],
  possibleErrorKeys: string[],
  map: boolean = true
) {
  const errorMap = new Map<string, string>();
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

function arrayInterset(arr1: any[], arr2: any[]) {
  const intersection = arr1.filter((item) => arr2.includes(item))[0];
  return intersection;
}

function mapToObject(map: Map<string, any>) {
  const data: { [key: string]: any } = {};
  map.forEach((mapItem, mapKey) => {
    data[mapKey] = mapItem;
  });
  return data;
}
