import { ApplicationCase, Case } from "../model/ApiModals";
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

export async function createNewCaseApi(
  accessToken: string,
  userId: number,
  caseType: string,
  reason: string,
): Promise<string> {
  return await performApiRequest(
    "/api/case/create",
    "POST",
    {
      userId,
      caseType,
      reason,
    },
    accessToken,
  );
}

export async function getCasesApi(
  userId: number,
  accessToken: string,
): Promise<Case[]> {
  const res = await performApiRequest(
    `/api/case/list?userId=${userId}`,
    "GET",
    null,
    accessToken,
  );
  return <Case[]>res.data;
}

export async function getCaseDetailsApi(
  caseId: number,
  accessToken: string,
): Promise<ApplicationCase> {
  const res = await performApiRequest(
    `/api/case/asylum/get?caseId=${caseId}`,
    "GET",
    null,
    accessToken,
  );
  return <ApplicationCase>res.data;
}
