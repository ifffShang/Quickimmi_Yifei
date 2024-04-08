import { Form } from "../model/FormModels";
import { performApiRequest } from "./apiConfig";

export async function getForm(id: string): Promise<Form> {
  return await performApiRequest(`forms/${id}.json`, "GET", null, "", true);
}
