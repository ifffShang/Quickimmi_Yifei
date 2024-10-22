import { Role } from "../consts/consts";
import { ListCase, UpdateProgressRequestDto } from "../model/apiModels";
import { RefinePSResponse } from "../model/formFlowModels";
import { performApiRequest } from "./apiConfig";

// Create new application case by customer
export async function createNewCaseApi(
  accessToken: string,
  userId: number,
  reason: string,
  asylumType: string,
  role: Role,
): Promise<string> {
  const res = await performApiRequest({
    endPoint: "api/case/asylum/create",
    method: "POST",
    data: {
      userId,
      reason,
      asylumType,
    },
    accessToken,
    role,
  });

  return <string>res.data;
}

export async function deleteCaseApi(caseId: number, accessToken: string, role: Role): Promise<boolean> {
  const res = await performApiRequest({
    endPoint: `api/case/delete?caseId=${caseId}`,
    method: "GET",
    data: null,
    accessToken,
    role,
    caseId,
  });
  return <boolean>res.data;
}

// get all cases for a customer
export async function getCasesApi(
  userId: number,
  pageNumber: number,
  pageSize: number,
  accessToken: string,
  role: Role,
): Promise<ListCase> {
  const res = await performApiRequest({
    endPoint: `api/case/list?userId=${userId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    method: "GET",
    data: null,
    accessToken,
    role,
  });
  return <ListCase>res.data;
}

// @deprecated
// get all cases for a lawyer
export async function getCasesByLawyerApi(
  lawyerId: number,
  pageNumber: number,
  pageSize: number,
  accessToken: string,
  role: Role,
): Promise<ListCase> {
  const res = await performApiRequest({
    endPoint: `api/case/listByLawyerId?lawyerId=${lawyerId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    method: "GET",
    data: null,
    accessToken,
    role,
  });
  return <ListCase>res.data;
}

/**
 * Query cases by lawyer, can also pass into query, current step, sorted by as parameters
 * @param lawyerId
 * @param pageNumber
 * @param pageSize
 * @param accessToken
 * @param role
 * @returns
 */
export async function queryCasesByLawyerApi(
  lawyerId: number,
  pageNumber: number,
  pageSize: number,
  accessToken: string,
  role: Role,
): Promise<ListCase> {
  const res = await performApiRequest({
    endPoint: "api/case/queryByLawyer",
    method: "POST",
    data: {
      lawyerId,
      pageNumber,
      pageSize,
    },
    accessToken,
    role,
  });
  return <ListCase>res.data;
}

export async function queryCasesByCustomerApi(
  customerId: number,
  pageNumber: number,
  pageSize: number,
  accessToken: string,
  role: Role,
): Promise<ListCase> {
  const res = await performApiRequest({
    endPoint: "api/case/queryByCustomer",
    method: "POST",
    data: {
      customerId,
      pageNumber,
      pageSize,
    },
    accessToken,
    role,
  });
  return <ListCase>res.data;
}

export async function updateCaseNameApi(
  caseId: number,
  caseName: string,
  accessToken: string,
  role: Role,
): Promise<boolean> {
  const res = await performApiRequest({
    endPoint: `api/case/updateCaseName`,
    method: "POST",
    data: { caseId, caseName },
    accessToken,
    role,
    caseId,
  });
  return res.data;
}

export async function updateCaseProgressApi(
  data: UpdateProgressRequestDto,
  accessToken: string,
  role: Role,
  caseId: number,
): Promise<boolean> {
  const res = await performApiRequest({
    endPoint: "api/case/updateProgress",
    method: "POST",
    data,
    accessToken,
    role,
    caseId,
  });
  return <boolean>res.data;
}

export async function generatePersonalStatementApi(
  accessToken: string,
  role: Role,
  caseId: number,
  language: string,
): Promise<string> {
  const res = await performApiRequest({
    endPoint: `api/case/asylum/generatePersonalStatement?caseId=${caseId}&language=${language}`,
    method: "GET",
    data: null,
    accessToken,
    role,
    caseId,
  });
  return <string>res.data;
}

export async function generatePSWithAIForCaseApi(
  accessToken: string,
  role: Role,
  caseId: number,
  language: string,
): Promise<RefinePSResponse> {
  const res = await performApiRequest({
    endPoint: `api/case/asylum/generatePSWithAIForCase?caseId=${caseId}&language=${language}`,
    method: "GET",
    data: null,
    accessToken,
    role,
    caseId,
  });
  return <RefinePSResponse>res.data;
}

export async function refinePSWithPromptApi(
  accessToken: string,
  role: Role,
  originalLanguage: string,
  englishPS: string,
  originalPS: string,
  prompt: string,
): Promise<RefinePSResponse> {
  const res = await performApiRequest({
    endPoint: `api/case/asylum/RefinePSWithPrompt`,
    method: "POST",
    data: {
      originalLanguage,
      englishPS,
      originalPS,
      prompt,
    },
    accessToken,
    role,
  });
  return <RefinePSResponse>res.data;
}

export async function translatePersonalStatementToEnglishAndOriginalLanguageApi(
  accessToken: string,
  role: Role,
  caseId: number,
  content: string,
  originalLanguage: string,
): Promise<RefinePSResponse> {
  const requestDto = {
    caseId,
    content,
    originalLanguage,
  };
  const res = await performApiRequest({
    endPoint: `api/case/asylum/translatePersonalStatementToEnglishAndOriginalLanguage`,
    method: "POST",
    data: requestDto,
    accessToken,
    role,
    caseId,
  });
  return <RefinePSResponse>res.data;
}

export async function generateCoverLetterApi(accessToken: string, role: Role, caseId: number): Promise<string> {
  const res = await performApiRequest({
    endPoint: `api/case/asylum/generateCoverLetter?caseId=${caseId}`,
    method: "GET",
    data: null,
    accessToken,
    role,
    caseId,
  });
  return <string>res.data;
}

export async function translatePersonalStatementToOriginalLanguageApi(
  accessToken: string,
  role: Role,
  caseId: number,
  content: string,
  language: string,
): Promise<string> {
  const requestDto = {
    caseId,
    content,
    language,
  };
  const res = await performApiRequest({
    endPoint: `api/case/asylum/translatePersonalStatementToOriginalLanguage`,
    method: "POST",
    data: requestDto,
    accessToken,
    role,
    caseId,
  });
  return <string>res.data;
}
