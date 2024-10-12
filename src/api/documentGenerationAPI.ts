import { Role } from "../consts/consts";
import { GenerateDocumentResponse } from "../model/apiReqResModels";
import { DocumentType } from "../model/commonModels";
import { CaseType } from "../model/immigrationTypes";
import { performApiRequest } from "./apiConfig";

export async function generateDocumentsByDocumentTypeApi(
  accessToken: string,
  caseId: number,
  documentType: DocumentType,
  role: Role,
  caseType: CaseType,
): Promise<GenerateDocumentResponse[]> {
  if (caseType === CaseType.Asylum) {
    return await generateAsylumDocumentsByDocumentTypeApi(accessToken, caseId, documentType, role);
  }
  if (caseType === CaseType.FamilyBased) {
    return await generateFamilyBasedDocumentsByDocumentTypeApi(accessToken, caseId, documentType, role);
  }
  throw new Error("Case type not supported");
}

export async function generateAsylumDocumentsByDocumentTypeApi(
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

export async function generateFamilyBasedDocumentsByDocumentTypeApi(
  accessToken: string,
  caseId: number,
  documentType: DocumentType,
  role: Role,
): Promise<GenerateDocumentResponse[]> {
  const res = await performApiRequest({
    endPoint: `api/case/family-based/generateDocumentsByDocumentType?id=${caseId}&documentType=${documentType}`,
    method: "GET",
    data: null,
    accessToken,
    role,
    caseId,
  });
  return <GenerateDocumentResponse[]>res.data;
}
