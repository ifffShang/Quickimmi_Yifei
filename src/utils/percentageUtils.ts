import { isArray, isObject } from "lodash";
import { AsylumCaseProfile, Percentage, Progress } from "../model/apiModels";
import { ControlType, IForm, IFormField } from "../model/formFlowModels";
import { getCaseDetailValue, getFieldValue } from "./utils";

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

export function buildPercentageObject(form: IForm, progress?: Progress) {
  const percentage = extractPercentageFromMetadata(progress);
  return fillMissingPercentageProperties(percentage, form);
}

export function fillMissingPercentageProperties(percentage: Percentage, form: IForm): Percentage {
  let newPercentage: Percentage = percentage;
  if (!newPercentage) {
    newPercentage = { overall: { avg: 0 } };
  }
  form.steps.forEach(step => {
    if (step.standalone) return;
    if (!newPercentage[step.id]) {
      newPercentage[step.id] = { avg: 0 } as any;
    } else if (!newPercentage[step.id].avg) {
      newPercentage[step.id].avg = 0;
    }
    step.steps.forEach(subStep => {
      if (!subStep.referenceId) return;
      if (!newPercentage[step.id][subStep.referenceId]) {
        newPercentage[step.id][subStep.referenceId] = 0;
      }
    });

    // Remove the substeps that are not in the form, for example, i94 is only in the form for affirmative asylum, we should not have it in defensive asylum case
    Object.keys(newPercentage[step.id]).forEach(subStepId => {
      if (subStepId === "avg") return;
      if (!step.steps.find(subStep => subStep.referenceId === subStepId)) {
        delete newPercentage[step.id][subStepId];
      }
    });
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
  profile: AsylumCaseProfile,
  arrObj?: any,
  index?: number,
) {
  let total = 0,
    fulfilled = 0;
  if (!fields) return { total, fulfilled };

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
