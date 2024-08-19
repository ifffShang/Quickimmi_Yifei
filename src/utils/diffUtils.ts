// From https://stackoverflow.com/a/61406094/4459070

export interface ObjectUpdate {
  [propName: string]: Update | ObjectUpdate;
}

export interface ObjectDiff {
  added: object | ObjectDiff;
  removed: object | ObjectDiff;
  updated: {
    [propName: string]: Update | ObjectDiff;
  };
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
  static diffUpdate(oldObj: object, newObj: object, deep = false): ObjectUpdate | undefined {
    const updated = {};
    for (const oldProp in oldObj) {
      if (Object.prototype.hasOwnProperty.call(oldObj, oldProp)) {
        const newPropValue = newObj[oldProp];
        const oldPropValue = oldObj[oldProp];
        if (Object.prototype.hasOwnProperty.call(newObj, oldProp)) {
          if (newPropValue !== oldPropValue) {
            if (deep && this.isObject(oldPropValue) && this.isObject(newPropValue)) {
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
      return {};
    }
    return updated;
  }

  static diff(oldObj: object, newObj: object, deep = false): ObjectDiff | undefined {
    const added = {} as any;
    const updated = {} as any;
    const removed = {} as any;
    for (const oldProp in oldObj) {
      if (Object.prototype.hasOwnProperty.call(oldObj, oldProp)) {
        const newPropValue = newObj[oldProp];
        const oldPropValue = oldObj[oldProp];
        if (Object.prototype.hasOwnProperty.call(newObj, oldProp)) {
          if (newPropValue !== oldPropValue) {
            if (deep && this.isObject(oldPropValue) && this.isObject(newPropValue)) {
              const diff = this.diffUpdate(oldPropValue, newPropValue, deep);
              if (diff && Object.keys(diff).length > 0) {
                updated[oldProp] = diff;
              }
            }
          }
        } else {
          removed[oldProp] = oldPropValue;
        }
      }
    }
    for (const newProp in newObj) {
      if (Object.prototype.hasOwnProperty.call(newObj, newProp)) {
        const oldPropValue = oldObj[newProp];
        const newPropValue = newObj[newProp];
        if (Object.prototype.hasOwnProperty.call(oldObj, newProp)) {
          if (oldPropValue !== newPropValue) {
            if (!deep || !this.isObject(oldPropValue)) {
              updated[newProp] = {
                oldValue: oldPropValue,
                newValue: newPropValue,
              };
            }
          }
        } else {
          added[newProp] = newPropValue;
        }
      }
    }
    const result = {} as any;
    if (Object.keys(added).length !== 0) {
      result["added"] = added;
    }

    if (Object.keys(updated).length !== 0) {
      result["updated"] = updated;
    }

    if (Object.keys(removed).length !== 0) {
      result["removed"] = removed;
    }
    return result;
  }
}
