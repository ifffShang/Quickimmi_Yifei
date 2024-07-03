import { AsylumCaseProfile, Percentage, Progress } from "../model/apiModels";
import { ControlType, IForm, IFormField } from "../model/formFlowModels";
import { getCaseDetailValue, getFieldValue } from "./utils";

export function extractPercentageFromMetadata(progress?: Progress) {
  if (!progress) return null;
  const fillingApplication = progress.steps.find(
    step => step.name === "FILLING_APPLICATION",
  );
  if (!fillingApplication) return null;
  const fillingDetails = fillingApplication.substeps.find(
    step => step.name === "FILLING_DETAILS",
  );
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

export function fillMissingPercentageProperties(
  percentage: Percentage,
  form: IForm,
): Percentage {
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
  });
  return newPercentage;
}

export function getSubFieldsPercentage(control: ControlType) {
  return (
    control === "group" ||
    control === "section" ||
    control === "removable_section"
  );
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

export function includeForPercentageCalc(control: ControlType) {
  return (
    control !== "label" &&
    control !== "divider" &&
    control !== "section" &&
    control !== "removable_section" &&
    control !== "component_mailing_same_as_residential" &&
    control !== "component_list_documents" &&
    control !== "component_add_item"
  );
}

export function includeForLastField(control: ControlType) {
  return (
    control !== "group" &&
    control !== "section" &&
    control !== "removable_section" &&
    control !== "component_list_documents"
  );
}

export function getPercentage(
  fields: IFormField[] | undefined,
  profile: AsylumCaseProfile,
  fieldArrValues?: any,
) {
  let total = 0,
    fulfilled = 0;
  if (!fields) return { total, fulfilled };

  let fieldValue = "-";
  fields.forEach(field => {
    if (excludeForPercentageCalc(field.control)) {
      return;
    }
    if (getSubFieldsPercentage(field.control)) {
      // For arrays like children, addresses, etc, we need to get the length and then calculate the fields in each array item
      const sectionFieldValue =
        field.control === "removable_section"
          ? getFieldValue(
              profile,
              field.key,
              field.control,
              field.options,
              field.format,
            )
          : fieldArrValues
            ? fieldArrValues
            : null;

      // Check visibility, if it is not visible, return total 0 and fulfilled 0
      if (
        field.control === "section" ||
        field.control === "removable_section"
      ) {
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
            const caseDetailValue = getCaseDetailValue(profile, key, 0);
            if (
              caseDetailValue === value ||
              (!caseDetailValue && (value === "null" || value === "undefined"))
            ) {
              hasTrue = true;
            }
          }
          if (!hasTrue) {
            return { total: 0, fulfilled: 0 };
          }
        }
      }

      const { total: subTotal, fulfilled: subFulfilled } = getPercentage(
        field.fields,
        profile,
        sectionFieldValue,
      );
      total += subTotal;
      fulfilled += subFulfilled;

      console.log(
        "*** Removable section: ",
        total,
        fulfilled,
        fieldValue,
        field.control,
      );
    } else {
      if (
        fieldArrValues &&
        fieldArrValues.arr &&
        fieldArrValues.arr.length >= 0
      ) {
        if (fieldArrValues.arr.length === 0) {
          return { total: 0, fulfilled: 0 };
        }

        fieldArrValues.arr.forEach((_item: any, index: number) => {
          if (excludeForPercentageCalc(field.control)) {
            return;
          }
          if (field.key) {
            fieldValue = getFieldValue(
              profile,
              field.key,
              field.control,
              field.options,
              field.format,
              index,
            );
            if (
              fieldValue !== null &&
              fieldValue !== undefined &&
              fieldValue !== ""
            ) {
              fulfilled++;
            }
            total++;
          }
        });
      } else if (field.key) {
        fieldValue = getFieldValue(
          profile,
          field.key,
          field.control,
          field.options,
          field.format,
        );

        if (
          fieldValue !== null &&
          fieldValue !== undefined &&
          fieldValue !== ""
        ) {
          fulfilled++;
        }
        total++;
      }
    }
    console.log("*** Field: ", total, fulfilled, fieldValue, field.key);
  });
  return { total, fulfilled };
}

export function getProgressWithPercentage(
  progress: Progress,
  percentage: Percentage,
) {
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
      return step;
    }),
  };
}
