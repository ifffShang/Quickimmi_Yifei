export function getObjectPath(obj: any, path: string[] = []): string | null {
  if (!isObjectWithSingleKey(obj)) {
    console.error(
      "getObjectPath: obj is not an object with a single key, please don't use this function for this type of object",
      obj,
    );
    return null;
  }

  const [key] = Object.keys(obj);
  const newPath = [...path, key];

  if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
    return getObjectPath(obj[key], newPath);
  }

  return newPath.join(".");
}

function isObjectWithSingleKey(obj: any): boolean {
  return typeof obj === "object" && obj !== null && Object.keys(obj).length === 1;
}
