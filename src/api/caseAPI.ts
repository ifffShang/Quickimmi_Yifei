import {
  ApplicationCase,
  Case,
  GeneratePresignedUrlResponse,
  ParsePassportResponse,
  UpdateApplicationCaseData,
  UploadedDocument,
} from "../model/apiModels";
import { IForm, IFormFields } from "../model/formFlowModels";
import { DocumentType, Identity } from "../model/commonModels";
import { performApiRequest } from "./apiConfig";
import { convertBooleans } from "../utils/utils";

export async function getForm(id: string): Promise<IForm> {
  return await performApiRequest(
    `forms/${id}.json?${new Date().getTime()}`,
    "GET",
    null,
    "",
    true,
  );
}

export async function getFormFields(referenceId: string): Promise<IFormFields> {
  const response = await performApiRequest(
    `forms/${referenceId}.json?${new Date().getTime()}`,
    "GET",
    null,
    "",
    true,
  );
  return convertBooleans(<IFormFields>response);
}

// new application by customer
export async function createNewCaseApi(
  accessToken: string,
  userId: number,
  reason: string,
  asylumType: string,
): Promise<string> {
  const res = await performApiRequest(
    "api/case/asylum/create",
    "POST",
    {
      userId,
      reason,
      asylumType,
    },
    accessToken,
  );
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
): Promise<string> {
  const res = await performApiRequest(
    "api/case/asylum/createByLawyer",
    "POST",
    {
      lawyerId,
      applicantName,
      asylumType,
      maritalStatus,
      applyWithChildren,
      numberOfChildren,
      providedCustomerEmail,
    },
    accessToken,
  );
  return <string>res.data;
}

export async function deleteCaseApi(
  caseId: number,
  accessToken: string,
): Promise<boolean> {
  const res = await performApiRequest(
    `api/case/delete?caseId=${caseId}`,
    "GET",
    null,
    accessToken,
  );
  return <boolean>res.data;
}

// get all cases for a customer
export async function getCasesApi(
  userId: number,
  accessToken: string,
): Promise<Case[]> {
  const res = await performApiRequest(
    `api/case/list?userId=${userId}`,
    "GET",
    null,
    accessToken,
  );
  return <Case[]>res.data;
}

// get all cases for a lawyer
export async function getCasesByLawyerApi(
  lawyerId: number,
  accessToken: string,
): Promise<Case[]> {
  const res = await performApiRequest(
    `api/case/listByLawyerId?lawyerId=${lawyerId}`,
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
  await flushRedisCache(accessToken);

  const res = await performApiRequest(
    `api/case/asylum/get?id=${caseId}`,
    "GET",
    null,
    accessToken,
  );
  return res.data as ApplicationCase;
}

export async function updateApplicationCaseApi(
  data: UpdateApplicationCaseData,
  accessToken: string,
): Promise<boolean> {
  const res = await performApiRequest(
    `api/case/asylum/update`,
    "POST",
    data,
    accessToken,
  );
  return <boolean>res.data;
}

export async function generateDocumentPresignedUrl(
  userId: number,
  caseId: number,
  type: DocumentType,
  documentName: string,
  identify: Identity,
  accessToken: string,
): Promise<GeneratePresignedUrlResponse> {
  const res = await performApiRequest(
    "api/document/generatePresignedUrl/put",
    "POST",
    {
      userId,
      caseId,
      type,
      documentName,
      identify,
    },
    accessToken,
  );
  return <GeneratePresignedUrlResponse>res.data;
}

export async function parsePassportApi(
  documentId: number,
  accessToken: string,
): Promise<ParsePassportResponse> {
  const res = await performApiRequest(
    `api/document/parse/passport?documentId=${documentId}`,
    "POST",
    null,
    accessToken,
  );
  return <ParsePassportResponse>res.data;
}

export async function getDocumentByIdApi(
  accessToken: string,
  documentId: number,
): Promise<UploadedDocument> {
  const res = await performApiRequest(
    `api/document/get?documentId=${documentId}`,
    "GET",
    null,
    accessToken,
  );
  return <UploadedDocument>res.data;
}

export async function getDocumentsApi(
  accessToken: string,
  caseId: number,
  type?: DocumentType,
): Promise<UploadedDocument[]> {
  const documentTypeRequestParam = type ? `&documentType=${type}` : "";

  const res = await performApiRequest(
    `api/document/list?caseId=${caseId}${documentTypeRequestParam}`,
    "GET",
    null,
    accessToken,
  );
  return <UploadedDocument[]>res.data;
}

export async function generateDocumentsApi(
  accessToken: string,
  caseId: number,
): Promise<boolean> {
  const res = await performApiRequest(
    `/api/case/asylum/generateDocuments?id=${caseId}`,
    "GET",
    null,
    accessToken,
  );
  return <boolean>res.data;
}

/**
 * This is for development purposes only
 * @returns
 */
export async function flushRedisCache(accessToken: string): Promise<boolean> {
  const res = await performApiRequest(
    "api/cache/flushAll",
    "GET",
    null,
    accessToken,
  );
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
