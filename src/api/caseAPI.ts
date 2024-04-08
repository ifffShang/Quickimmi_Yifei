import { IForm, IFormFields } from "../model/FormModels";
import { performApiRequest } from "./apiConfig";

export async function getForm(id: string): Promise<IForm> {
  return await performApiRequest(`forms/${id}.json`, "GET", null, "", true);
}

export async function getFormFields(referenceId: string): Promise<IFormFields> {
  return await performApiRequest(
    `forms/${referenceId}.json`,
    "GET",
    null,
    "",
    true,
  );
}
