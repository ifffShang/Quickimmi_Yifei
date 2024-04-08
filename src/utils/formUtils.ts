import { Form } from "../model/FormModels";
import i589_form from "../forms/i589_form.json";
import { getForm } from "../api/caseAPI";

export async function get589Form(): Promise<Form> {
  const form = await getForm("i589_form");
  return form; //Promise.resolve(i589_form as Form);
}
