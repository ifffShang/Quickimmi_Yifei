import type { TableProps } from "antd";
import { Button, message, Table, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  generateDocumentsByDocumentTypeApi,
  generatePresignedUrlByDocumentId,
  getDocumentByIdApi,
  getDocumentsApi,
  retryGetDocumentsApi,
  updateDocumentStatus,
  uploadFileToPresignUrl,
} from "../../../api/documentAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { GeneratedDocument } from "../../../model/apiModels";
import { convertToDocumentType, DocumentType } from "../../../model/commonModels";
import { clearDocumentUrls, updateGeneratedDocuments } from "../../../reducers/formSlice";
import { downloadDocument } from "../../../utils/utils";
import { Status } from "../parts/Status";
import "./DocumentList.css";
import { updateApplicationCaseFunc } from "../../../utils/functionUtils";

interface DataType {
  key: number;
  filename: any;
  status: any;
  createdAt: string;
  updatedAt: string;
  action: any;
}

const generatedDocTableColumns: TableProps<DataType>["columns"] = [
  // {
  //   title: "Category",
  //   dataIndex: "category",
  //   key: "category"
  // },
  {
    title: "File Name",
    dataIndex: "filename",
    key: "name",
    //sorter: (a, b) => a.filename.localeCompare(b.filename),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    //sorter: (a, b) => a.status.localeCompare(b.status),
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    responsive: ["lg"],
    // sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
    key: "updatedAt",
    // sorter: (a, b) => a.updatedAt.localeCompare(b.updatedAt),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

export function DocumentList() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const role = useAppSelector(state => state.auth.role);

  const caseId = useAppSelector(state => state.form.caseId);
  const profile = useAppSelector(state => state.form.applicationCase.profile);
  const progress = useAppSelector(state => state.form.applicationCase.progress);
  const percentage = useAppSelector(state => state.form.percentage);

  const generatedDocuments = useAppSelector(state => state.form.generatedDocuments);
  const [loading, setLoading] = useState(false);
  const [replaceLoading, setReplaceLoading] = useState(false);
  const [allGenerationCompleted, setAllGenerationCompleted] = useState(false);
  const [canGenerateDoc, setCanGenerateDoc] = useState(false);
  const replaceFileControl = useRef<HTMLInputElement | null>(null);
  const systemAutoGeneratedGenerationType = { generationType: "SYSTEM_AUTO_GENERATED" };

  const refreshTableContent = () => {
    if (!accessToken || !caseId || caseId === 0) {
      console.error("Access token or case id is missing");
      return;
    }

    setLoading(true);
    dispatch(clearDocumentUrls());
    getDocumentsApi(accessToken, caseId, role, systemAutoGeneratedGenerationType)
      .then(documents => {
        setLoading(false);
        if (!documents) {
          console.error("Failed to get documents");
          return;
        }
        const allFinished = !documents.some(doc => doc.status === "In Progress");
        setAllGenerationCompleted(allFinished);
        dispatch(updateGeneratedDocuments(documents));
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
    setCanGenerateDoc(percentage?.["overall"]?.avg == 100);
  };

  useEffect(() => {
    if (replaceLoading || replaceLoading === undefined || replaceLoading === null) {
      return;
    }
    refreshTableContent();
  }, [accessToken, caseId, role, replaceLoading]);

  const onDownloadClick = async (doc: GeneratedDocument) => {
    if (!accessToken) {
      message.error("Access token is missing");
      return;
    }
    try {
      const docWithPresignedUrl = await getDocumentByIdApi(accessToken, doc.id, role, caseId);
      const response = await fetch(docWithPresignedUrl.presignUrl);
      if (!response.ok) {
        message.error("Failed to download document.");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = window.document.createElement("a");
      a.href = url;
      a.download = docWithPresignedUrl.name;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      message.error("Error downloading document");
      console.error(error);
    }
  };

  const handleDocumentGeneration = async (docType: string) => {
    if (!caseId || !accessToken) {
      console.error("Case ID or access token is not available");
      return;
    }
    setLoading(true);
    setAllGenerationCompleted(false);
    try {
      await updateApplicationCaseFunc(caseId, profile, progress, percentage, role, accessToken);
      await generateDocumentsByDocumentTypeApi(accessToken, caseId, convertToDocumentType(docType), role);
      await retryGetDocumentsApi(
        accessToken,
        caseId,
        role,
        (documents, timeout) => {
          if (timeout) {
            console.error("Document generation timeout.");
            return true;
          }
          setLoading(false);
          const documentsToUpdate = [...documents];
          const allFinished = !documentsToUpdate.some(doc => doc.status === "In Progress");
          setAllGenerationCompleted(allFinished);
          dispatch(updateGeneratedDocuments(documentsToUpdate));
          return allFinished;
        },
        systemAutoGeneratedGenerationType,
      );
    } catch (error) {
      message.error(`Error ${docType === "ALL" ? "generating" : "retrying"} documents`);
      console.error(error);
      setAllGenerationCompleted(true);
      setLoading(false);
    }
  };

  const onRetryClick = async (doc: GeneratedDocument) => {
    await handleDocumentGeneration(doc.type);
  };

  const generateDocument = async () => {
    await handleDocumentGeneration("ALL");
  };

  const onReplaceFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    documentId: number,
    documentType: DocumentType,
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (!accessToken) {
        console.error("Access token is missing");
        return;
      }
      generatePresignedUrlByDocumentId(
        documentId,
        "Applicant",
        documentType,
        file.name,
        "APPLICANT",
        accessToken,
        role,
      ).then(presignedUrl => {
        uploadFileToPresignUrl(
          presignedUrl,
          file,
          (_percent: number) => {},
          () => {
            updateDocumentStatus(role, documentId, true, "SUCCESS", accessToken, caseId).then(isSuccessful => {
              if (isSuccessful) {
                setReplaceLoading(false);
                console.log("File uploaded successfully");
              }
            });
          },
          (error: Error) => {
            updateDocumentStatus(role, documentId, true, "FAILED", accessToken, caseId).then(isSuccessful => {
              if (isSuccessful) {
                setReplaceLoading(false);
                console.log("File error status updated successfully");
              }
            });
            console.error("Error uploading file: ", error);
          },
        ).then(() => refreshTableContent());
      });
    }
  };

  const calculateGeneratedDocStatus = (doc: GeneratedDocument) => {
    if (doc.manualOverridden) {
      return "Replaced";
    }
    return doc.status;
  };

  const uploadedDocumentsInTable = generatedDocuments
    .filter(doc => doc.generationType === "system_auto_generated")
    .map(doc => {
      return {
        key: doc.id,
        // category: convertDocTypeToCategory(doc.type, t),
        filename: (
          <div>
            {doc.status === "Success" ? (
              <a
                href="#"
                onClick={async e => {
                  e.preventDefault();
                  if (!accessToken) {
                    message.error("Access token missing. Please login again.");
                    return;
                  }
                  try {
                    const document = await getDocumentByIdApi(accessToken, doc.id, role, caseId);
                    const downloadedDocument = await downloadDocument(document.presignUrl, { ...document });
                    window.open(downloadedDocument.presignUrl, "_blank");
                  } catch (error) {
                    console.error("Failed to fetch document:", error);
                    message.error("Failed to fetch document. Please try again.");
                  }
                }}
              >
                {doc.name}
              </a>
            ) : (
              doc.name
            )}
          </div>
        ),
        status: <Status status={calculateGeneratedDocStatus(doc)} />,
        createdAt: doc.createdAt ? new Date(doc.createdAt).toLocaleString() : "-",
        updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toLocaleString() : "-",
        action: (
          <>
            <div className="document-list-action">
              {(doc.status === "Success" || doc.status === "uploaded") && (
                <>
                  <a onClick={() => onDownloadClick(doc)}>{t("Download")}</a>{" "}
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      const input = document.getElementById(`file-upload-${doc.id}`);
                      if (input) {
                        input.click();
                      }
                    }}
                  >
                    {t("Replace")}
                  </a>
                  <input
                    type="file"
                    id={`file-upload-${doc.id}`}
                    ref={replaceFileControl}
                    onChange={e => onReplaceFileUpload(e, doc.id, convertToDocumentType(doc.type))}
                    style={{ display: "none" }}
                  />
                </>
              )}
              {allGenerationCompleted && doc.status != "In Progress" && doc.status != "Skipped" && (
                <a onClick={() => onRetryClick(doc)}>{t("Retry")}</a>
              )}
            </div>
          </>
        ),
      };
    });

  const generateTooltipText = () => {
    if (canGenerateDoc && generatedDocuments.length > 0) {
      // For "Regenerate Documents" button
      return t("RegeneratingDocButtonTooltip");
    } else if (canGenerateDoc && generatedDocuments.length === 0) {
      // For enabled "Regenerate Documents" button
      return t("Automatically generate application document based on the input information");
    } else {
      // For disabled "Generate Documents" button
      return t("The button will only be available when the form is 100% complete.");
    }
  };

  return (
    <div className="document-list">
      <div className="document-list-inner">
        <Tooltip title={generateTooltipText()}>
          <Button type="primary" onClick={generateDocument} className="document-list-btn" disabled={!canGenerateDoc}>
            {generatedDocuments.length === 0 ? t("Generate Documents") : t("Regenerate Documents")}
          </Button>
        </Tooltip>
        <Table
          loading={loading || replaceLoading}
          bordered={false}
          columns={generatedDocTableColumns?.map(c => ({ ...c, title: t(c.title as string) }))}
          dataSource={uploadedDocumentsInTable}
        />
      </div>
    </div>
  );
}
