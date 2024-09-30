import { DocumentCreatedBy, DocumentOperation, DocumentStatus, DocumentType, Identity } from "../model/commonModels";
import { Role } from "../consts/consts";
import {
  EligibilityCheckResult,
  GeneratePresignedUrlResponse,
  ParsePassportResponse,
  UploadedDocument,
  GenerationType,
} from "../model/apiModels";
import { performApiRequest } from "./apiConfig";
import {
  GenerateDocumentResponse,
  GetDocumentsAdditionalParams,
  ParseMarriageCertificateResponse,
} from "../model/apiReqResModels";
import { retryApi } from "./retry";

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

export async function deleteDocumentApi(
  role: Role,
  documentId: number,
  accessToken: string,
  caseId: number,
): Promise<boolean> {
  const res = await performApiRequest({
    endPoint: `api/document/delete?documentId=${documentId}`,
    method: "POST",
    data: { documentId },
    accessToken,
    role,
    caseId,
  });
  return <boolean>res.data;
}

export async function parsePassportApi(
  documentId: number,
  accessToken: string,
  role: Role,
  caseId: number,
): Promise<ParsePassportResponse> {
  const res = await performApiRequest({
    endPoint: `api/document/parse/passport?documentId=${documentId}`,
    method: "POST",
    data: null,
    accessToken,
    role,
    caseId,
  });
  return <ParsePassportResponse>res.data;
}

export async function parseMarriageCertificateApi(
  documentId: number,
  accessToken: string,
  role: Role,
  caseId: number,
): Promise<ParseMarriageCertificateResponse> {
  const res = await performApiRequest({
    endPoint: `api/document/parse/marriageCertificate?documentId=${documentId}`,
    method: "POST",
    data: null,
    accessToken,
    role,
    caseId,
  });
  return <ParseMarriageCertificateResponse>res.data;
}

export async function getDocumentByIdApi(
  accessToken: string,
  documentId: number,
  role: Role,
  caseId: number,
): Promise<UploadedDocument> {
  const res = await performApiRequest({
    endPoint: `api/document/get?documentId=${documentId}`,
    method: "GET",
    data: null,
    accessToken,
    role,
    caseId,
  });
  return <UploadedDocument>res.data;
}

export async function getDocumentByIdApiWithRetry(
  accessToken: string,
  documentId: number,
  caseId: number,
  role: Role,
  retryOnError: (error: any) => boolean,
): Promise<UploadedDocument> {
  const result = await retryApi({
    apiFunc: () => getDocumentByIdApi(accessToken, documentId, role, caseId),
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
    caseId,
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
    caseId,
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
    caseId,
  });
  return <GenerateDocumentResponse[]>res.data;
}

export async function updateDocumentStatus(
  role: Role,
  documentId: number,
  manualOverride: boolean,
  documentStatus: DocumentStatus,
  accessToken: string,
  caseId: number,
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
    caseId,
  });

  if (!res || !res.data) {
    throw new Error("Failed to receive a valid response from the server.");
  }

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
    caseId,
  });
  return <EligibilityCheckResult>res.data;
}

export async function downloadDocuments(
  caseId: number,
  accessToken: string,
  role: Role,
  generationType: GenerationType,
): Promise<string> {
  const res = await performApiRequest({
    endPoint: `api/document/downloadDocuments?caseId=${caseId}&generationType=${generationType}`,
    method: "GET",
    data: null,
    accessToken,
    role,
    caseId,
  });
  return <string>res.data;
}
