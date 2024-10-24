import { getObjectPath } from "../../utils/getObjectPathUtil";

describe("getObjectPath with single key objects", () => {
  it("should return the correct path for a single key object", () => {
    const obj = { a: { b: { c: 3 } } };
    const result = getObjectPath(obj);
    expect(result).toBe("a.b.c");
  });

  it("should return null for an object with multiple keys", () => {
    const obj = { a: 1, b: 2 };
    const result = getObjectPath(obj);
    expect(result).toBeNull();
  });

  it("should return null for an empty object", () => {
    const obj = {};
    const result = getObjectPath(obj);
    expect(result).toBeNull();
  });

  it("should return the correct path for a deeply nested single key object", () => {
    const obj = { a: { b: { c: { d: { e: [] } } } } };
    const result = getObjectPath(obj);
    expect(result).toBe("a.b.c.d.e");
  });

  it("should return the correct path for a single key object with a null value", () => {
    const obj = { a: null };
    const result = getObjectPath(obj);
    expect(result).toBe("a");
  });

  it("should return null for a non-object input", () => {
    const obj = "not an object";
    const result = getObjectPath(obj);
    expect(result).toBeNull();
  });

  it("should return null for an object with a single key but non-object value", () => {
    const obj = { a: 1 };
    const result = getObjectPath(obj);
    expect(result).toBe("a");
  });
});
