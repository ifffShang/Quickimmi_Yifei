// From https://stackoverflow.com/a/61406094/4459070

export interface ObjectDiff {
  [propName: string]: Update | ObjectDiff;
}

export interface Update {
  oldValue: any;
  newValue: any;
}

export class ObjectUtils {
  /**
   * @return if obj is an Object, including an Array.
   */
  static isObject(obj: any) {
    return obj !== null && typeof obj === "object";
  }

  /**
   * @param oldObj The previous Object or Array.
   * @param newObj The new Object or Array.
   * @param deep If the comparison must be performed deeper than 1st-level properties.
   * @return A difference summary between the two objects, assuming both object has the same structure.
   */
  static diffUpdate(
    oldObj: object,
    newObj: object,
    deep = false,
  ): ObjectDiff | undefined {
    const updated = {};
    for (const oldProp in oldObj) {
      if (Object.prototype.hasOwnProperty.call(oldObj, oldProp)) {
        const newPropValue = newObj[oldProp];
        const oldPropValue = oldObj[oldProp];
        if (Object.prototype.hasOwnProperty.call(newObj, oldProp)) {
          if (newPropValue !== oldPropValue) {
            if (
              deep &&
              this.isObject(oldPropValue) &&
              this.isObject(newPropValue)
            ) {
              const diff = this.diffUpdate(oldPropValue, newPropValue, deep);
              if (diff && Object.keys(diff).length > 0) {
                updated[oldProp] = diff;
              }
            } else {
              updated[oldProp] = {
                newValue: newPropValue,
                oldValue: oldPropValue,
              };
            }
          }
        }
      }
    }
    if (Object.keys(updated).length === 0) {
      return;
    }
    return updated;
  }
}
