import _ from "lodash";

export default function cleanNullishValue<T>(payload: T): T {
  const result: Record<string, any> = {};

  for (const key in payload) {
    switch (true) {
      case Array.isArray(payload[key]):
        if (payload[key].length) {
          result[key] = payload[key].map((item) => {
            if (typeof item === "object") {
              return cleanNullishValue(item);
            }
            return item;
          });
        }
        break;

      case typeof payload[key] === "object":
        result[key] = cleanNullishValue(payload[key]);
        break;

      case typeof payload[key] === "string":
        if (payload[key].length) {
          result[key] = payload[key];
        }
        break;

      default:
        if (payload[key] !== null && payload[key] !== undefined) {
          result[key] = payload[key];
        }
        break;
    }
  }

  return result as T;
}
