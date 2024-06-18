import { Progress } from "../model/apiModels";
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

export function buildFormPercentageObject(form: IForm) {
  const percentage: any = { overall: { avg: 0 } };
  form.steps.forEach(step => {
    if (step.standalone) return;
    percentage[step.id] = { avg: 0 } as any;
    step.steps.forEach(subStep => {
      if (!subStep.referenceId) return;
      percentage[step.id][subStep.referenceId] = 0;
    });
  });
  return percentage;
}

export function includeForPercentageCalc(control: ControlType) {
  return (
    control !== "checkbox" &&
    control !== "label" &&
    control !== "divider" &&
    control !== "section" &&
    control !== "removable_section" &&
    control !== "component_mailing_same_as_residential" &&
    control !== "component_generate_report" &&
    control !== "component_list_reports" &&
    control !== "component_add_item"
  );
}

export function includeForLastField(control: ControlType) {
  return (
    control !== "group" &&
    control !== "section" &&
    control !== "removable_section" &&
    control !== "component_generate_report" &&
    control !== "component_list_reports"
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
