import { IForm } from "../model/formFlowModels";

export function getCorrectedIndexes(form: IForm, indexLevel1: number, indexLevel2: number) {
  const totalLevel1s = form.steps.length;
  let correctedIndexLevel1 = indexLevel1;
  let correctedIndexLevel2 = indexLevel2;
  if (correctedIndexLevel1 < 0 || correctedIndexLevel1 >= totalLevel1s) {
    correctedIndexLevel1 = 0;
  }
  if (correctedIndexLevel2 < 0 || correctedIndexLevel2 >= form.steps[correctedIndexLevel1].steps.length) {
    correctedIndexLevel2 = 0;
  }
  return { correctedIndexLevel1, correctedIndexLevel2 };
}

export function removePropertiesNotDefinedInModel(model: any, obj: any) {
  if (obj === null || obj === undefined) {
    return obj;
  }
  Object.keys(obj).forEach(key => {
    if (!Object.prototype.hasOwnProperty.call(model, key)) {
      delete obj[key];
    }
  });
  return obj;
}

export function deepAssign(update: any, current: any, init: any) {
  const result: any = {};
  if (typeof update !== "object") {
    return result;
  }
  for (const key in update) {
    if (Object.prototype.hasOwnProperty.call(update, key)) {
      const value = update[key];
      if (value === false || value === "false") {
        result[key] = "false";
      } else if (value === true || value === "true") {
        result[key] = "true";
      } else if (value === null || value === undefined) {
        result[key] = current?.[key] || init?.[key] || null;
      } else if (typeof value === "object" && !Array.isArray(value)) {
        result[key] = deepAssign(value, current?.[key], init?.[key]);
      } else {
        result[key] = value;
      }
    }
  }
  for (const key in current) {
    if (Object.prototype.hasOwnProperty.call(current, key) && !Object.prototype.hasOwnProperty.call(result, key)) {
      const value = current[key];
      if (value === false || value === "false") {
        result[key] = "false";
      } else if (value === true || value === "true") {
        result[key] = "true";
      } else if (value === null || value === undefined) {
        result[key] = init?.[key] || null;
      } else if (typeof value === "object" && !Array.isArray(value)) {
        result[key] = deepAssign({}, current?.[key], init?.[key]);
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}

/**
 * Deeply overwrite the target object with the update object, like array fields in the application case
 * @param update
 * @param target
 * @returns
 */
export function deepOverwrite(update: any, target: any) {
  for (const key in update) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      const value = update[key];
      if (Array.isArray(value)) {
        if (value.length === 0) {
          target[key] = [];
        } else {
          for (let i = 0; i < value.length; i++) {
            if (typeof value[i] === "object" && target[key][i] !== null && typeof target[key][i] === "object") {
              target[key][i] = deepOverwrite(value[i], target[key][i]);
            } else {
              target[key] = value;
              break;
            }
          }
        }
      } else if (value !== null && typeof value === "object") {
        target[key] = deepOverwrite(value, target[key]);
      } else {
        target[key] = value;
      }
    } else {
      target[key] = update[key];
    }
  }
  return target;
}
