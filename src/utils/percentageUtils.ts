import { Percentage, Progress } from "../model/apiModels";
import { ControlType, IForm, IFormField } from "../model/formFlowModels";

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

export function includeForPercentageCalc(control: ControlType) {
  return (
    control !== "checkbox" &&
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

export function getKeyCount(fields: IFormField[]) {
  return fields.reduce(
    (prevCount, currentField, _currentIndex, _arr) => {
      let count = prevCount;
      const currentKey = currentField.key;
      if (includeForPercentageCalc(currentField.control) && currentKey) {
        count++;
      }
      if (currentField.fields) {
        count += getKeyCount(currentField.fields);
      }
      return count;
    },
    0, // Set the initial value to 0
  );
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
