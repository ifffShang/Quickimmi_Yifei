import { CacheStore } from "../cache/cache";
import { Role } from "../consts/consts";
import {
  ApplicationCase,
  CaseSummary,
  EligibilityCheckResult,
  GeneratePresignedUrlResponse,
  GetCaseProfileResponse,
  LawyerInfo,
  ListCase,
  ParsePassportResponse,
  UpdateApplicationCaseData,
  UpdateLawyerRequest,
  UpdateProgressRequestDto,
  UploadedDocument,
} from "../model/apiModels";
import {
  DocumentGenerationTaskStatus,
  GenerateDocumentResponse,
  GetDocumentsAdditionalParams,
  ParseMarriageCertificateResponse,
} from "../model/apiReqResModels";
import { DocumentCreatedBy, DocumentOperation, DocumentStatus, DocumentType, Identity } from "../model/commonModels";
import { IForm, IFormFields } from "../model/formFlowModels";
import { getProgressWithPercentage } from "../utils/percentageUtils";
import { convertBooleans } from "../utils/utils";
import { performApiRequest } from "./apiConfig";
import { retryApi } from "./retry";
import { removePropertiesNotDefinedInModel } from "../utils/caseUtils";
import { InitialApplicationCase } from "../consts/caseConsts";

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

// new application by customer
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

// new case by lawyer
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

export async function queryCaseApi(
  lawyerId: number,
  query: string,
  currentStep: string,
  sortedBy: string,
  pageNumber: number,
  pageSize: number,
  accessToken: string,
  role: Role,
): Promise<ListCase> {
  const requestBody = {
    lawyerId,
    query,
    currentStep,
    sortedBy,
    pageNumber,
    pageSize,
  };
  const res = await performApiRequest({
    endPoint: `api/case/query`,
    method: "GET",
    data: requestBody,
    accessToken,
    role,
  });

  return <ListCase>res.data;
}

export async function getCaseDetailsApi(caseId: number, accessToken: string, role: Role): Promise<ApplicationCase> {
  await flushRedisCache(accessToken, role);

  const res = await performApiRequest({
    endPoint: `api/case/asylum/get?id=${caseId}`,
    method: "GET",
    data: null,
    accessToken,
    role,
  });
  return res.data as ApplicationCase;
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

  await flushRedisCache(accessToken, role);

  const res = await performApiRequest({
    endPoint: `api/case/asylum/getCaseProfile?id=${caseId}`,
    method: "GET",
    data: null,
    accessToken,
    role,
  });
  const responseData = res.data as GetCaseProfileResponse;
  if (!responseData.profile) {
    // For the newly created case, profile is null by default. Initiate it here.
    responseData.profile = InitialApplicationCase.profile;
  }
  const filteredData: GetCaseProfileResponse = {
    profile: removePropertiesNotDefinedInModel(InitialApplicationCase.profile, responseData.profile),
    progress: responseData.progress,
  };
  return filteredData;
}

export async function getCaseSummaryApi(caseId: number, accessToken: string, role: Role): Promise<CaseSummary> {
  const res = await performApiRequest({
    endPoint: `api/case/asylum/getCaseSummary?id=${caseId}`,
    method: "GET",
    data: null,
    accessToken,
    role,
  });
  return res.data as CaseSummary;
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
  });
  return res.data;
}

export async function updateApplicationCaseApi(
  data: UpdateApplicationCaseData,
  accessToken: string,
  role: Role,
): Promise<boolean> {
  const res = await performApiRequest({
    endPoint: `api/case/asylum/update`,
    method: "POST",
    data,
    accessToken,
    role,
  });
  return <boolean>res.data;
}

export async function updateCaseProgressApi(
  data: UpdateProgressRequestDto,
  accessToken: string,
  role: Role,
): Promise<boolean> {
  const res = await performApiRequest({
    endPoint: "api/case/asylum/updateProgress",
    method: "POST",
    data,
    accessToken,
    role,
  });
  return <boolean>res.data;
}

export async function generateDocumentPresignedUrl(
  userId: number,
  caseId: number,
  type: DocumentType,
  documentName: string,
  identify: Identity,
  operation: DocumentOperation,
  description: string,
  createdBy: string,
  accessToken: string,
  role: Role,
): Promise<GeneratePresignedUrlResponse> {
  const res = await performApiRequest({
    endPoint: "api/document/generatePresignedUrl/put",
    method: "POST",
    data: {
      userId,
      caseId,
      type,
      documentName,
      identify,
      operation,
      description,
      createdBy,
    },
    accessToken,
    role,
  });
  return <GeneratePresignedUrlResponse>res.data;
}

export async function generatePresignedUrlByDocumentId(
  documentId: number,
  identity: Identity,
  type: DocumentType,
  documentName: string,
  createdBy: DocumentCreatedBy,
  accessToken: string,
  role: Role,
) {
  const res = await performApiRequest({
    endPoint: "api/document/generatePresignedUrlByDocumentId/put",
    method: "POST",
    data: {
      documentId,
      identify: identity,
      type,
      documentName,
      createdBy,
    },
    accessToken,
    role,
  });
  return <string>res.data;
}

export async function parsePassportApi(
  documentId: number,
  accessToken: string,
  role: Role,
): Promise<ParsePassportResponse> {
  const res = await performApiRequest({
    endPoint: `api/document/parse/passport?documentId=${documentId}`,
    method: "POST",
    data: null,
    accessToken,
    role,
  });
  return <ParsePassportResponse>res.data;
}

export async function parseMarriageCertificateApi(
  documentId: number,
  accessToken: string,
  role: Role,
): Promise<ParseMarriageCertificateResponse> {
  const res = await performApiRequest({
    endPoint: `api/document/parse/marriageCertificate?documentId=${documentId}`,
    method: "POST",
    data: null,
    accessToken,
    role,
  });
  return <ParseMarriageCertificateResponse>res.data;
}

export async function getDocumentByIdApi(
  accessToken: string,
  documentId: number,
  role: Role,
): Promise<UploadedDocument> {
  const res = await performApiRequest({
    endPoint: `api/document/get?documentId=${documentId}`,
    method: "GET",
    data: null,
    accessToken,
    role,
  });
  return <UploadedDocument>res.data;
}

export async function getDocumentByIdApiWithRetry(
  accessToken: string,
  documentId: number,
  role: Role,
  retryOnError: (error: any) => boolean,
): Promise<UploadedDocument> {
  const result = await retryApi({
    apiFunc: () => getDocumentByIdApi(accessToken, documentId, role),
    checkResult: () => true,
    interval: 5000,
    retryOnError: retryOnError,
  });
  return result;
}

export async function getDocumentsApi(
  accessToken: string,
  caseId: number,
  role: Role,
  params?: GetDocumentsAdditionalParams,
): Promise<UploadedDocument[]> {
  const documentTypeRequestParam = params && params.type ? `&documentType=${params.type}` : "";
  const identityRequestParam = params && params.identity ? `&identify=${params.identity}` : "";
  const autoGeneratedRequestParam = params && params.autoGenerated ? `&autoGenerated=${params.autoGenerated}` : "";
  const generationTypeRequestParam = params && params.generationType ? `&generationType=${params.generationType}` : "";

  const res = await performApiRequest({
    endPoint: `api/document/list?caseId=${caseId}${documentTypeRequestParam}${identityRequestParam}${autoGeneratedRequestParam}${generationTypeRequestParam}`,
    method: "GET",
    data: null,
    accessToken,
    role,
  });
  return <UploadedDocument[]>res.data;
}

export async function retryGetDocumentsApi(
  accessToken: string,
  caseId: number,
  role: Role,
  callback: (documents: UploadedDocument[], timeout?: boolean) => boolean,
  params?: GetDocumentsAdditionalParams,
): Promise<UploadedDocument[]> {
  const result = await retryApi({
    apiFunc: () => getDocumentsApi(accessToken, caseId, role, params),
    checkResult: callback,
    interval: 5000,
  });
  return result;
}

export async function generateDocumentsByDocumentTypeApi(
  accessToken: string,
  caseId: number,
  documentType: DocumentType,
  role: Role,
): Promise<GenerateDocumentResponse[]> {
  const res = await performApiRequest({
    endPoint: `api/case/asylum/generateDocumentsByDocumentType?id=${caseId}&documentType=${documentType}`,
    method: "GET",
    data: null,
    accessToken,
    role,
  });
  return <GenerateDocumentResponse[]>res.data;
}

export async function defaultMergeApi(
  accessToken: string,
  caseId: number,
  role: Role,
): Promise<GenerateDocumentResponse[]> {
  const res = await performApiRequest({
    endPoint: `api/case/asylum/defaultMerge?id=${caseId}`,
    method: "POST",
    data: null,
    accessToken,
    role,
  });
  return <GenerateDocumentResponse[]>res.data;
}

// @Deprecated
export async function getDocumentGenerationTaskStatusByTaskIdApi(
  accessToken: string,
  taskId: number,
  role: Role,
): Promise<DocumentGenerationTaskStatus> {
  const res = await performApiRequest({
    endPoint: `api/case/asylum/getDocumentGenerationTaskStatusByTaskId?taskId=${taskId}`,
    method: "GET",
    data: null,
    accessToken,
    role,
  });
  return <DocumentGenerationTaskStatus>res.data;
}

export async function getDocumentGenerationTaskStatusApi(
  accessToken: string,
  taskIds: number[],
  role: Role,
): Promise<DocumentGenerationTaskStatus[]> {
  const res = await performApiRequest({
    endPoint: `api/case/asylum/getDocumentGenerationTasksStatus?taskid=${taskIds}`,
    method: "GET",
    data: null,
    accessToken,
    role,
  });
  return <DocumentGenerationTaskStatus[]>res.data;
}

/**
 * This is for development purposes only
 * @returns
 */
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

export async function uploadFileToPresignUrl(
  presignedUrl: string,
  file: any,
  onProgress: (percent: number) => void,
  onSuccess: () => void,
  onError: (error: Error) => void,
  isImage?: boolean,
) {
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", presignedUrl, true);
  isImage && xhr.setRequestHeader("Content-Type", "image/jpeg");
  xhr.upload.onprogress = e => {
    if (e.lengthComputable) {
      onProgress((e.loaded / e.total) * 100);
    }
  };
  xhr.onload = () => {
    if (xhr.status < 200 || xhr.status >= 300) {
      onError(new Error(`Upload failed with status ${xhr.status}`));
      return;
    }
    onSuccess();
  };
  xhr.onerror = () => {
    onError(new Error(`Upload failed due to ${xhr.statusText}`));
  };
  xhr.send(file as Blob);
}

export async function updateDocumentStatus(
  role: Role,
  documentId: number,
  manualOverride: boolean,
  documentStatus: DocumentStatus,
  accessToken: string,
): Promise<boolean> {
  const requestDto = {
    documentId,
    manualOverride,
    documentStatus,
  };
  const res = await performApiRequest({
    endPoint: "api/document/update",
    method: "POST",
    data: requestDto,
    accessToken,
    role,
  });

  if (!res || !res.data) {
    throw new Error("Failed to receive a valid response from the server.");
  }

  return <boolean>res.data;
}

export async function deleteDocumentApi(role: Role, documentId: number, accessToken: string): Promise<boolean> {
  const res = await performApiRequest({
    endPoint: `api/document/delete?documentId=${documentId}`,
    method: "POST",
    data: { documentId },
    accessToken,
    role,
  });
  return <boolean>res.data;
}

export async function getDocumentTypesApi(accessToken: string, role: Role): Promise<DocumentType[]> {
  const res = await performApiRequest({
    endPoint: "api/document/getSupportedDocumentTypes",
    method: "GET",
    data: null,
    accessToken,
    role,
  });
  return <DocumentType[]>res.data;
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
  });
  return <string>res.data;
}

export async function getLawyerByCognitoIdApi(accessToken: string, role: Role, cognitoId: string): Promise<LawyerInfo> {
  const res = await performApiRequest({
    endPoint: `api/lawyer/getByLawyerCognitoId?cognitoId=${cognitoId}`,
    method: "GET",
    data: null,
    accessToken,
    role,
  });
  return <LawyerInfo>res.data;
}

export async function updateLawyerInfoApi(
  accessToken: string,
  role: Role,
  data: UpdateLawyerRequest,
): Promise<boolean> {
  const res = await performApiRequest({
    endPoint: "api/lawyer/update",
    method: "POST",
    data,
    accessToken,
    role,
  });
  return <boolean>res.data;
}

export async function canMergeDocumentForCase(
  caseId: number,
  accessToken: string,
  role: Role,
): Promise<EligibilityCheckResult> {
  const res = await performApiRequest({
    endPoint: `api/case/asylum/checkEligibilityForMerge?id=${caseId}`,
    method: "GET",
    data: null,
    accessToken,
    role,
  });
  return <EligibilityCheckResult>res.data;
}
