import { Role } from "../consts/consts";
import { UpdateApplicationCaseData } from "../model/apiModels";
import { CaseType } from "../model/immigrationTypes";
import { performApiRequest } from "./apiConfig";

export async function updateApplicationCaseApi(
  data: UpdateApplicationCaseData,
  accessToken: string,
  role: Role,
  caseId: number,
  caseType: CaseType,
): Promise<boolean> {
  if (caseType === CaseType.Asylum) {
    return await updateAsylumApplicationCaseApi(data, accessToken, role, caseId);
  }
  if (caseType === CaseType.FamilyBased) {
    return await updateFamilyBasedApplicationCaseApi(data, accessToken, role, caseId);
  }
  throw new Error("Unexpected case type for update application case API");
}

export async function updateAsylumApplicationCaseApi(
  data: UpdateApplicationCaseData,
  accessToken: string,
  role: Role,
  caseId: number,
): Promise<boolean> {
  const res = await performApiRequest({
    endPoint: `api/case/asylum/update`,
    method: "POST",
    data,
    accessToken,
    role,
    caseId,
  });
  return <boolean>res.data;
}

export async function updateFamilyBasedApplicationCaseApi(
  data: UpdateApplicationCaseData,
  accessToken: string,
  role: Role,
  caseId: number,
): Promise<boolean> {
  const res = await performApiRequest({
    endPoint: `api/case/family-based/update`,
    method: "POST",
    data,
    accessToken,
    role,
    caseId,
  });
  return <boolean>res.data;
}
