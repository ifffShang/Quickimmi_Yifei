import { Role } from "../consts/consts";
import {
  ApplicationCase,
  Case,
  CaseSummary,
  GeneratePresignedUrlResponse,
  GetCaseProfileResponse,
  ParsePassportResponse,
  UpdateApplicationCaseData,
  UploadedDocument,
} from "../model/apiModels";
import {
  DocumentCreatedBy,
  DocumentOperation,
  DocumentStatus,
  DocumentType,
  Identity,
} from "../model/commonModels";
import { IForm, IFormFields } from "../model/formFlowModels";
import { convertBooleans } from "../utils/utils";
import { performApiRequest } from "./apiConfig";

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

export async function deleteCaseApi(
  caseId: number,
  accessToken: string,
  role: Role,
): Promise<boolean> {
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
  accessToken: string,
  role: Role,
): Promise<Case[]> {
  const res = await performApiRequest({
    endPoint: `api/case/list?userId=${userId}`,
    method: "GET",
    data: null,
    accessToken,
    role,
  });
  return <Case[]>res.data;
}

// get all cases for a lawyer
export async function getCasesByLawyerApi(
  lawyerId: number,
  accessToken: string,
  role: Role,
): Promise<Case[]> {
  const res = await performApiRequest({
    endPoint: `api/case/listByLawyerId?lawyerId=${lawyerId}`,
    method: "GET",
    data: null,
    accessToken,
    role,
  });
  return <Case[]>res.data;
}

export async function getCaseDetailsApi(
  caseId: number,
  accessToken: string,
  role: Role,
): Promise<ApplicationCase> {
  await flushRedisCache(accessToken, role);

  const res = await performApiRequest({
    endPoint: `api/case/asylum/get?id=${caseId}`,
    method: "GET",
    data: null,
    accessToken,
    role,
  });
  res.data.percentage = res.data.percentage
    ? JSON.parse(res.data.percentage)
    : null;
  return res.data as ApplicationCase;
}

export async function getCaseProfileAndProgressApi(
  caseId: number,
  accessToken: string,
  role: Role,
): Promise<GetCaseProfileResponse> {
  await flushRedisCache(accessToken, role);

  const res = await performApiRequest({
    endPoint: `api/case/asylum/getCaseProfile?id=${caseId}`,
    method: "GET",
    data: null,
    accessToken,
    role,
  });
  res.data.percentage = res.data.percentage
    ? JSON.parse(res.data.percentage)
    : null;
  return res.data as GetCaseProfileResponse;
}

export async function getCaseSummaryApi(
  caseId: string,
  accessToken: string,
  role: Role,
): Promise<CaseSummary> {
  const res = await performApiRequest({
    endPoint: `api/case/asylum/getCaseSummary?id=${caseId}`,
    method: "GET",
    data: null,
    accessToken,
    role,
  });
  return res.data as CaseSummary;
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

export async function getDocumentsApi(
  accessToken: string,
  caseId: number,
  role: Role,
  type?: DocumentType,
): Promise<UploadedDocument[]> {
  const documentTypeRequestParam = type ? `&documentType=${type}` : "";

  const res = await performApiRequest({
    endPoint: `api/document/list?caseId=${caseId}${documentTypeRequestParam}`,
    method: "GET",
    data: null,
    accessToken,
    role,
  });
  return <UploadedDocument[]>res.data;
}

export async function generateDocumentsApi(
  accessToken: string,
  caseId: number,
  role: Role,
): Promise<boolean> {
  const res = await performApiRequest({
    endPoint: `api/case/asylum/generateDocuments?id=${caseId}`,
    method: "GET",
    data: null,
    accessToken,
    role,
  });
  return <boolean>res.data;
}

/**
 * This is for development purposes only
 * @returns
 */
export async function flushRedisCache(
  accessToken: string,
  role: Role,
): Promise<boolean> {
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
) {
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", presignedUrl, true);
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

export async function deleteDocumentApi(
  role: Role,
  documentId: number,
  accessToken: string,
): Promise<boolean> {
  const res = await performApiRequest({
    endPoint: `api/document/delete?documentId=${documentId}`,
    method: "POST",
    data: { documentId },
    accessToken,
    role,
  });
  return <boolean>res.data;
}
