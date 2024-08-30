import { Role } from "../consts/consts";
import { performApiRequest } from "./apiConfig";
import { IForm, IFormFields } from "../model/formFlowModels";
import { convertBooleans } from "../utils/utils";

// Form related APIs
export async function getForm(id: string): Promise<IForm> {
  return await performApiRequest({
    endPoint: `forms/${id}.json?${new Date().getTime()}`,
    method: "GET",
    data: null,
    accessToken: "",
    self: true,
  });
}

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

export async function refineApi(
  accessToken: string,
  role: Role,
  type: string,
  question: string,
  content: string,
): Promise<string> {
  const requestDto = {
    type,
    question,
    content,
  };
  const res = await performApiRequest({
    endPoint: `api/case/asylum/refine`,
    method: "POST",
    data: requestDto,
    accessToken,
    role,
  });
  return <string>res.data;
}

// Redis is not in used now. This is for development purposes only
export async function flushRedisCache(accessToken: string, role: Role): Promise<boolean> {
  const res = await performApiRequest({
    endPoint: "api/cache/flushAll",
    method: "GET",
    data: null,
    accessToken,
    role,
  });
  return <boolean>res.data;
}
