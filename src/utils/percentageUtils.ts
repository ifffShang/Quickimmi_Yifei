import { isArray, isObject } from "lodash";
import { Percentage, Progress } from "../model/apiModels";
import { CaseProfile } from "../model/commonApiModels";
import { ControlType, IForm, IFormField, IFormStepAndFieldsRecord } from "../model/formFlowModels";
import { getCaseDetailValue, getFieldValue } from "./utils";

export function getFormPercentage(
  allFormStepAndFields: IFormStepAndFieldsRecord[],
  profile: CaseProfile | null,
): Percentage {
  if (!allFormStepAndFields || !profile) {
    console.error("Either allFormStepAndFields or profile is missing.");
    return { overall: { avg: 0 } };
  }
  const percentage: Percentage = { overall: { avg: 0 } };
  allFormStepAndFields.forEach(({ step, subStep, fields }) => {
    if (step.standalone || subStep.standalone) return;
    const { total, fulfilled } = getPercentage(fields.fields, profile);
    let currentPercentage = 0;
    if (total === 0) {
      currentPercentage = 100;
    } else {
      currentPercentage = Math.round((fulfilled / total) * 100);
    }
    if (!percentage[step.label]) {
      percentage[step.label] = { avg: 0 };
    }
    percentage[step.label][subStep.label] = currentPercentage;
    percentage[step.label].avg = getAvgPercentageForSection(percentage, step.label);
  });
  percentage.overall.avg = getOverallAvgPercentage(percentage);
  return percentage;
}

export function getAvgPercentageForSection(percentage: Percentage, section: string) {
  let sum = 0;
  let count = 0;
  Object.entries(percentage[section]).forEach(([key, value]) => {
    if (key !== "avg") {
      if (value === -1) {
        return;
      }
      sum += value;
      count++;
    }
  });
  return count === 0 ? 0 : Math.round(sum / count);
}

export function getOverallAvgPercentage(percentage: Percentage) {
  let sum = 0;
  let count = 0;
  Object.entries(percentage).forEach(([key, value]) => {
    if (key !== "overall") {
      const avg = getAvgPercentageForSection(percentage, key);
      sum += avg;
      count++;
    }
  });
  return count === 0 ? 0 : Math.round(sum / count);
}

export function extractPercentageFromMetadata(progress?: Progress) {
  if (!progress) return null;
  const fillingApplication = progress.steps.find(step => step.name === "FILLING_APPLICATION");
  if (!fillingApplication) return null;
  const fillingDetails = fillingApplication.substeps.find(step => step.name === "FILLING_DETAILS");
  if (!fillingDetails) return null;

  if (fillingDetails.metadata) {
    return JSON.parse(fillingDetails.metadata).percentage;
  }
  return null;
}

export function buildPercentageObject(form: IForm, progress?: Progress): Percentage {
  const percentage = extractPercentageFromMetadata(progress);
  return fillMissingPercentageProperties(percentage, form);
}

export function fillMissingPercentageProperties(percentage: Percentage | null, form: IForm): Percentage {
  const newPercentage: Percentage = percentage ? percentage : { overall: { avg: 0 } };

  form.steps.forEach(step => {
    if (step.standalone) return;
    if (!newPercentage[step.label]) {
      newPercentage[step.label] = { avg: 0 } as any;
    } else if (!newPercentage[step.label].avg) {
      newPercentage[step.label].avg = 0;
    }
    step.steps.forEach(subStep => {
      if (!subStep.label) return;
      if (!newPercentage[step.label][subStep.label]) {
        newPercentage[step.label][subStep.label] = 0;
      }
    });

    // Remove the substeps that are not in the form, for example, i94 is only in the form for affirmative asylum, we should not have it in defensive asylum case
    Object.keys(newPercentage[step.label]).forEach(subStepLabel => {
      if (subStepLabel === "avg") return;
      if (!step.steps.find(subStep => subStep.label === subStepLabel)) {
        delete newPercentage[step.label][subStepLabel];
      }
    });
  });

  // Remvoe the steps that are not in the form
  Object.keys(newPercentage).forEach(label => {
    if (label === "overall") return;
    if (!form.steps.find(step => step.label === label)) {
      delete newPercentage[label];
    }
  });

  return newPercentage;
}

export function getSubFieldsPercentage(control: ControlType) {
  return control === "group" || control === "section" || control === "removable_section";
}

export function excludeForPercentageCalc(control: ControlType) {
  return (
    control === "checkbox" || // exclude checkbox since we are not sure whether user doesn't check it or hasn't reached it yet
    control === "label" ||
    control === "divider" ||
    control === "component_mailing_same_as_residential" ||
    control === "component_list_documents" ||
    control === "component_add_item"
  );
}

export function getPercentage(
  fields: IFormField[] | undefined,
  profile: CaseProfile | null,
  arrObj?: any,
  index?: number,
) {
  let total = 0,
    fulfilled = 0;
  if (!fields || !profile) return { total, fulfilled };

  let fieldValue: any;
  fields.forEach(field => {
    if (excludeForPercentageCalc(field.control)) {
      return;
    }
    if (getSubFieldsPercentage(field.control)) {
      // For arrays like children, addresses, etc, we need to get the length and then calculate the fields in each array item
      const sectionArrObj =
        field.control === "removable_section"
          ? getFieldValue(profile, field.key, field.control, field.options, field.format)
          : arrObj
            ? arrObj
            : null;

      // Check visibility, if it is not visible, return total 0 and fulfilled 0
      if (field.control === "section" || field.control === "removable_section") {
        if (field.visibility) {
          let visibilityArray;
          //| represents the "or" logic
          if (field.visibility.indexOf("|") > -1) {
            visibilityArray = field.visibility.split("|");
          } else {
            visibilityArray = [field.visibility];
          }
          let hasTrue = false;
          for (let i = 0; i < visibilityArray.length; i++) {
            const [key, value] = visibilityArray[i].split("=");
            const caseDetailValue = getCaseDetailValue(profile, key, index);
            if (caseDetailValue === value || (!caseDetailValue && (value === "null" || value === "undefined"))) {
              hasTrue = true;
            }
          }
          if (!hasTrue) {
            return { total: 0, fulfilled: 0 };
          }
        }
      }

      if (sectionArrObj && sectionArrObj.arr && sectionArrObj.arr.length >= 0) {
        if (sectionArrObj.arr.length === 0) {
          return { total: 0, fulfilled: 0 };
        }

        sectionArrObj.arr.forEach((_item: any, index: number) => {
          const { total: subTotal, fulfilled: subFulfilled } = getPercentage(
            field.fields,
            profile,
            sectionArrObj,
            index,
          );
          total += subTotal;
          fulfilled += subFulfilled;
        });
      } else {
        const { total: subTotal, fulfilled: subFulfilled } = getPercentage(field.fields, profile, sectionArrObj, index);
        total += subTotal;
        fulfilled += subFulfilled;
      }
    } else if (field.key) {
      fieldValue = getFieldValue(profile, field.key, field.control, field.options, field.format, index);

      if (isArray(fieldValue)) {
        // For array of objects like entry records, we need to calculate the fields in each array item
        fieldValue.forEach((item: any) => {
          isObject(item) &&
            Object.keys(item).forEach(key => {
              if (item[key] !== null && item[key] !== undefined && item[key] !== "") {
                fulfilled++;
              }
              total++;
            });
        });

        // For passportStampPageDocumentIds, if it is empty, it means it is not filled
        // TODO: need a better way to handle the required fields
        if (field.key.indexOf("passportStampPageDocumentIds") > -1 && fieldValue.length === 0) {
          total++;
        }
      } else {
        if (fieldValue !== null && fieldValue !== undefined && fieldValue !== "") {
          // If passportDocumentId is 0, it means it is not filled
          if (field.key.indexOf("passportDocumentId") === -1 || fieldValue !== 0) {
            fulfilled++;
          }
        }
        total++;
      }
    }
    //console.log("*** Field: ", total, fulfilled, fieldValue, field.key, field.control);
  });

  return { total, fulfilled };
}

export function getProgressWithPercentage(progress: Progress, percentage: Percentage) {
  const isFillingApplicationCompleted = percentage?.overall?.avg === 100;

  if (!isFillingApplicationCompleted) {
    // Form filling is not 100%
    return {
      ...progress,
      steps: progress.steps.map(step => {
        if (step.name === "FILLING_APPLICATION") {
          return {
            ...step,
            status: "IN_PROGRESS",
            substeps: step.substeps.map(substep => {
              if (substep.name === "FILLING_DETAILS") {
                return {
                  ...substep,
                  metadata: JSON.stringify({
                    percentage: percentage,
                  }),
                  status: "IN_PROGRESS",
                };
              }
              return substep;
            }),
          };
        }
        if (step.name === "REVIEW_AND_SIGN") {
          return {
            ...step,
            status: "NOT_START",
            substeps: step.substeps.map(substep => {
              return {
                ...substep,
                status: "NOT_START",
              };
            }),
          };
        }
        return step;
      }),
    };
  } else {
    // Form filling is already 100%
    return {
      ...progress,
      steps: progress.steps.map(step => {
        if (step.name === "FILLING_APPLICATION") {
          return {
            ...step,
            status: "COMPLETED",
            substeps: step.substeps.map(substep => {
              if (substep.name === "FILLING_DETAILS") {
                return {
                  ...substep,
                  metadata: JSON.stringify({
                    percentage: percentage,
                  }),
                  status: "COMPLETED",
                };
              }
              return substep;
            }),
          };
        }
        if (step.name === "REVIEW_AND_SIGN") {
          return {
            ...step,
            status: "IN_PROGRESS",
            substeps: step.substeps.map(substep => {
              if (substep.name === "LAWYER_REVIEW") {
                return {
                  ...substep,
                  status: "IN_PROGRESS",
                };
              }
              return substep;
            }),
          };
        }
        return step;
      }),
    };
  }
}
