import { deepAssign } from "../../utils/caseUtils";

describe("Test deepAssign util", () => {
  it("should return an empty object if update is not an object", () => {
    // Arrange
    const update = "not an object";
    const current = {};
    const init = {};
    // Act
    const result = deepAssign(update, current, init);
    // Assert
    expect(result).toEqual({});
  });

  it("should merge objects correctly", () => {
    // Arrange
    const update = { a: true, b: 2 };
    const current = { a: null, b: 3, c: 4 };
    const init = { a: null, b: 0, c: 5, d: 6 };
    // Act
    const result = deepAssign(update, current, init);
    // Assert
    expect(result).toEqual({ a: "true", b: 2, c: 4 });
  });

  it("should handle nested objects", () => {
    // Arrange
    const update = { a: { b: 2 } };
    const current = { a: { c: 3 } };
    const init = { a: { d: 4 } };
    // Act
    const result = deepAssign(update, current, init);
    // Assert
    expect(result).toEqual({ a: { b: 2, c: 3 } });
  });

  it("should override values in current with update", () => {
    // Arrange
    const update = { a: 1 };
    const current = { a: 2 };
    const init = { a: 3 };
    // Act
    const result = deepAssign(update, current, init);
    // Assert
    expect(result).toEqual({ a: 1 });
  });

  it("should not modify the original objects", () => {
    // Arrange
    const update = { a: 1, c: "false", d: { e: null } };
    const current = { b: true };
    const init = { c: 3, d: { e: "true" } };
    // Act
    const result = deepAssign(update, current, init);
    // Assert
    expect(result).toEqual({ a: 1, b: "true", c: "false", d: { e: "true" } });
    expect(update).toEqual({ a: 1, c: "false", d: { e: null } });
    expect(current).toEqual({ b: true });
    expect(init).toEqual({ c: 3, d: { e: "true" } });
  });

  it("should handle undefined and null values, use value from init if both update and current is undefined or null", () => {
    // Arrange
    const update = { a: undefined, b: null };
    const current = { a: undefined, b: 2 };
    const init = { a: 3, b: 4 };
    // Act
    const result = deepAssign(update, current, init);
    // Assert
    expect(result).toEqual({ a: 3, b: 2 });
  });
});
