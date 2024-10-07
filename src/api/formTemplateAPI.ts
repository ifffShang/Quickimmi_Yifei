import { IForm, IFormFields, IFormStepAndFieldsRecord, IFormStructure } from "../model/formFlowModels";
import { CaseSubType, CaseType } from "../model/immigrationTypes";
import { convertBooleans } from "../utils/utils";
import { performApiRequest } from "./apiConfig";

export async function getFormFields(referenceId: string): Promise<IFormFields> {
  const response = await performApiRequest({
    endPoint: `forms/${referenceId}.json?${new Date().getTime()}`,
    method: "GET",
    data: null,
    accessToken: "",
    self: true,
  });
  return convertBooleans(<IFormFields>response);
}

export async function fetchCompleteFormDetails(caseType: CaseType, caseSubType: CaseSubType): Promise<IFormStructure> {
  const form = await getFormTemplate(caseType, caseSubType);
  const steps = form.steps;
  const allFormStepAndFormFields: IFormStepAndFieldsRecord[] = [];
  for (const step of steps) {
    for (const subStep of step.steps) {
      if (!subStep.referenceId) {
        console.error("Reference ID is missing.");
        continue;
      }
      const fields = await getFormFields(subStep.referenceId);
      allFormStepAndFormFields.push({
        step,
        subStep,
        fields,
      });
    }
  }
  return {
    formStepsAndFormFieldsList: allFormStepAndFormFields,
    form,
  };
}

export async function getFormTemplate(caseType: CaseType, caseSubType: CaseSubType): Promise<IForm> {
  let path = "";
  if (caseType === CaseType.Asylum) {
    path =
      caseSubType === CaseSubType.AFFIRMATIVE
        ? "asylum/i589_form_affirmative_asylum"
        : "asylum/i589_form_defensive_asylum";
  } else if (caseType === CaseType.FamilyBased) {
    path = "familyBased/form_family_based";
  } else {
    console.error(`Case type ${caseType} is not supported.`);
  }
  return await getFormTemplateByFormName(path);
}

async function getFormTemplateByFormName(path: string): Promise<IForm> {
  return await performApiRequest({
    endPoint: `forms/${path}.json?${new Date().getTime()}`,
    method: "GET",
    data: null,
    accessToken: "",
    self: true,
  });
}
