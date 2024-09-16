import { Role } from "../consts/consts";
import { CaseSummary } from "../model/apiModels";
import { CaseType } from "../model/immigrationTypes";
import { performApiRequest } from "./apiConfig";

export async function getCaseSummaryApi(
  accessToken: string,
  role: Role,
  caseId: number,
  caseType: CaseType,
): Promise<CaseSummary | undefined> {
  try {
    if (caseType === CaseType.Asylum) {
      return await getAsylumCaseSummaryApi(accessToken, role, caseId);
    }
    if (caseType === CaseType.FamilyBased) {
      return await getFamilyBasedCaseSummaryApi(accessToken, role, caseId);
    }
  } catch (error) {
    console.error("Failed to fetch case summary:", error);
  }
}

async function getAsylumCaseSummaryApi(accessToken: string, role: Role, caseId: number): Promise<CaseSummary> {
  const res = await performApiRequest({
    endPoint: `api/case/asylum/getCaseSummary?id=${caseId}`,
    method: "GET",
    data: null,
    accessToken,
    role,
    caseId,
  });
  return res.data as CaseSummary;
}

async function getFamilyBasedCaseSummaryApi(accessToken: string, role: Role, caseId: number): Promise<CaseSummary> {
  const res = await performApiRequest({
    endPoint: `api/case/family-based/getCaseSummary?id=${caseId}`,
    method: "GET",
    data: null,
    accessToken,
    role,
    caseId,
  });
  return res.data as CaseSummary;
}
