export interface GenerateDocumentResponse {
  taskId: number;
  documentType: DocumentType;
}

export interface DocumentGenerationTaskStatus {
  id: number;
  caseId: number;
  formName: string;
  status: string;
  presignedUrl: string;
  createdAt: number;
  updatedAt: number;
}
