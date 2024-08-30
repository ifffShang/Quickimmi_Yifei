import { CacheStore } from "../cache/cache";
import { Role } from "../consts/consts";
import {
  CaseSummary,
  EligibilityCheckResult,
  GeneratePresignedUrlResponse,
  GetCaseProfileResponse,
  ListCase,
  ParsePassportResponse,
  UpdateApplicationCaseData,
  UpdateProgressRequestDto,
  UploadedDocument,
} from "../model/apiModels";
import {
  GenerateDocumentResponse,
  GetDocumentsAdditionalParams,
  ParseMarriageCertificateResponse,
} from "../model/apiReqResModels";
import { DocumentCreatedBy, DocumentOperation, DocumentStatus, DocumentType, Identity } from "../model/commonModels";
import { getProgressWithPercentage } from "../utils/percentageUtils";
import { performApiRequest } from "./apiConfig";
import { retryApi } from "./retry";
import { removePropertiesNotDefinedInModel } from "../utils/caseUtils";
import { InitialApplicationCase } from "../consts/caseConsts";

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

// Create new case by lawyer
export async function createNewCaseByLawyerApi(
  accessToken: string,
  lawyerId: number,
  caseName: string,
  applicantName: string,
  asylumType: string,
  maritalStatus: string,
  applyWithChildren: boolean,
  numberOfChildren: number,
  providedCustomerEmail: string,
  role: Role,
): Promise<string> {
  const res = await performApiRequest({
    endPoint: "api/case/asylum/createByLawyer",
    method: "POST",
    data: {
      lawyerId,
      caseName,
      applicantName,
      asylumType,
      maritalStatus,
      applyWithChildren,
      numberOfChildren,
      providedCustomerEmail,
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

export async function updateCaseNameApi(
  caseId: number,
  caseName: string,
  accessToken: string,
  role: Role,
): Promise<boolean> {
  const res = await performApiRequest({
    endPoint: `api/case/asylum/updateCaseName`,
    method: "POST",
    data: { caseId, caseName },
    accessToken,
    role,
    caseId,
  });
  return res.data;
}

export async function getCaseProfileAndProgressApi(
  caseId: number,
  accessToken: string,
  role: Role,
): Promise<GetCaseProfileResponse> {
  const cachedProfile = CacheStore.getProfile(caseId);
  const cachedProgress = CacheStore.getProgress(caseId);
  const cachedPercentage = CacheStore.getPercentage(caseId);
  if (cachedProfile && cachedProgress && cachedPercentage) {
    return {
      profile: cachedProfile,
      progress: getProgressWithPercentage(cachedProgress, cachedPercentage),
    };
  }
  const res = await performApiRequest({
    endPoint: `api/case/asylum/getCaseProfile?id=${caseId}`,
    method: "GET",
    data: null,
    accessToken,
    role,
    caseId,
  });
  const responseData = res.data as GetCaseProfileResponse;
  if (!responseData.profile) {
    // For the newly created case, profile is null by default. Initiate the case profile here.
    responseData.profile = InitialApplicationCase.profile;
  }
  return {
    profile: removePropertiesNotDefinedInModel(InitialApplicationCase.profile, responseData.profile),
    progress: responseData.progress,
  };
}

export async function getCaseSummaryApi(caseId: number, accessToken: string, role: Role): Promise<CaseSummary> {
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

export async function updateApplicationCaseApi(
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

export async function updateCaseProgressApi(
  data: UpdateProgressRequestDto,
  accessToken: string,
  role: Role,
  caseId: number,
): Promise<boolean> {
  const res = await performApiRequest({
    endPoint: "api/case/asylum/updateProgress",
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
