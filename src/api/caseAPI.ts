import {
  ApplicationCase,
  Case,
  GeneratePresignedUrlResponse,
  ParsePassportResponse,
  UpdateApplicationCaseData,
  UploadedDocument,
} from "../model/apiModels";
import { IForm, IFormFields } from "../model/formModels";
import { DocumentType } from "../model/models";
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
    "api/case/asylum/create",
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
    `api/case/list?userId=${userId}`,
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
  return <ApplicationCase>res.data;
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

export async function getDocumentsApi(
  accessToken: string,
  caseId: number,
  type?: DocumentType,
): Promise<UploadedDocument[]> {
  const data = {
    caseId,
  };
  if (type) {
    data["documentType"] = type;
  }
  const res = await performApiRequest(
    `api/document/list`,
    "GET",
    data,
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
