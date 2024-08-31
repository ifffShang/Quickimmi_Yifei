import type { TableProps } from "antd";
import { Button, message, Table, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  canMergeDocumentForCase,
  defaultMergeApi,
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
import { moveCaseProgressToNextStep } from "../../../utils/progressUtils";
import { downloadDocument } from "../../../utils/utils";
import { Status } from "../parts/Status";
import "./DocumentList.css";
import { updateMergedDocuments } from "../../../reducers/formSlice";

interface DataType {
  key: number;
  filename: any;
  status: any;
  createdAt: string;
  updatedAt: string;
  action: any;
}

const mergedDocTableColumns: TableProps<DataType>["columns"] = [
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

export function MergedDocumentList() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const role = useAppSelector(state => state.auth.role);

  const caseId = useAppSelector(state => state.form.caseId);
  const progress = useAppSelector(state => state.form.applicationCase.progress);

  const mergedDocuments = useAppSelector(state => state.form.mergedDocuments);
  const [loading, setLoading] = useState(false);
  const [replaceLoading, setReplaceLoading] = useState(false);
  const [allMergeCompleted, setAllMergeCompleted] = useState(false);
  const [canMerge, setCanMerge] = useState(false);
  const [missingDocs, setMissingDocs] = useState<string[]>([]);
  const replaceFileControl = useRef<HTMLInputElement | null>(null);
  const systemMergedDocumentType = { generationType: "SYSTEM_MERGED" };

  console.log("------------------mergedDocuments", mergedDocuments);
  const refreshTableContentAndMergeButton = () => {
    if (!accessToken || !caseId || caseId === 0) {
      console.error("Access token or case id is missing");
      return;
    }
    setLoading(true);
    canMergeDocumentForCase(caseId, accessToken, role)
      .then(result => {
        setCanMerge(result.status);
        if (result.missingFields.length > 0) {
          setMissingDocs(result.missingFields);
        }
      })
      .catch(error => {
        console.error(error);
      });
    getDocumentsApi(accessToken, caseId, role, systemMergedDocumentType)
      .then(documents => {
        if (!documents) {
          message.error("Failed to get merged documents.");
          console.error("Failed to get documents");
          return;
        }
        dispatch(updateMergedDocuments(documents));
        const allFinished = !documents.some(doc => doc.status === "In Progress");
        setAllMergeCompleted(allFinished);
      })
      .catch(error => {
        console.error(error);
      });
    setLoading(false);
  };

  useEffect(() => {
    if (replaceLoading || replaceLoading === undefined || replaceLoading === null) {
      return;
    }
    refreshTableContentAndMergeButton();
  }, [caseId, accessToken, role]);

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

  const mergeDocuments = async () => {
    if (!caseId || !accessToken) {
      console.error("Case ID or access token is not available");
      return;
    }
    setLoading(true);
    setAllMergeCompleted(false);
    try {
      await defaultMergeApi(accessToken, caseId, role);
      await retryGetDocumentsApi(
        accessToken,
        caseId,
        role,
        (documents, timeout) => {
          if (timeout) {
            console.error("Merge Document timeout.");
            return true;
          }
          setLoading(false);
          const documentsToUpdate = [...documents];
          dispatch(updateMergedDocuments(documentsToUpdate));
          const allMergeTasksFinished = !documentsToUpdate.some(doc => doc.status === "In Progress");
          setAllMergeCompleted(allMergeTasksFinished);
          return allMergeTasksFinished;
        },
        systemMergedDocumentType,
      );
    } catch (error) {
      message.error(`Error merging documents`);
      console.error("Error generating documents: ", error);
      setAllMergeCompleted(true);
      setLoading(false);
    }
  };

  const markLawyerReviewAsCompleted = async () => {
    if (!accessToken || !caseId) {
      message.error("Access token or CaseId is missing");
      return false;
    }
    const currentStep = "REVIEW_AND_SIGN";
    const currentSubStep = "LAWYER_REVIEW";
    const success = await moveCaseProgressToNextStep(
      caseId.toString(),
      progress.steps,
      accessToken,
      role,
      currentStep,
      currentSubStep,
      "",
    );
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
            updateDocumentStatus(role, documentId, true, "UPLOADED", accessToken, caseId).then(isSuccessful => {
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
        ).then(() => refreshTableContentAndMergeButton());
      });
    }
  };
  const calculateGeneratedDocStatus = (doc: GeneratedDocument) => {
    if (doc.manualOverridden) {
      return "Replaced";
    }
    return doc.status;
  };

  const uploadedDocumentsInTable = mergedDocuments
    .filter(doc => doc.generationType === "system_merged")
    .map(doc => {
      return {
        key: doc.id,
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
            {(doc.status === "Success" || doc.status === "uploaded") && (
              <div className="document-list-action">
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
              </div>
            )}
          </>
        ),
      };
    });

  const generateTooltipText = () => {
    if (canMerge) {
      return "";
    } else if (missingDocs.length > 0) {
      return t("The button will only be available when all the docs in the previous steps are successfully generated.");
    }
  };

  return (
    <div className="document-list">
      <div className="document-list-inner">
        <Tooltip title={generateTooltipText()}>
          <Button type="primary" onClick={mergeDocuments} className="document-list-btn" disabled={!canMerge}>
            {t("Generate Merged Documents")}
          </Button>
        </Tooltip>
        <Button
          type="primary"
          onClick={markLawyerReviewAsCompleted}
          className="document-list-btn"
          disabled={!(canMerge && allMergeCompleted && mergedDocuments.length > 0)}
        >
          {t("Complete Review")}
        </Button>
        <Table
          loading={loading || replaceLoading}
          bordered={false}
          columns={mergedDocTableColumns?.map(c => ({ ...c, title: t(c.title as string) }))}
          dataSource={uploadedDocumentsInTable}
        />
      </div>
    </div>
  );
}
