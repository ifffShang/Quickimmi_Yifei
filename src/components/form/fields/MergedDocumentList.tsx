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
} from "../../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { GeneratedDocument } from "../../../model/apiModels";
import { convertToDocumentType, DocumentType } from "../../../model/commonModels";
import { moveCaseProgressToNextStep } from "../../../utils/progressUtils";
import { downloadDocument } from "../../../utils/utils";
import { Status } from "../parts/Status";
import "./DocumentList.css";
import { updateGeneratedDocuments, updateMergedDocuments } from "../../../reducers/formSlice";

interface DataType {
  key: number;
  filename: any;
  status: any;
  createdAt: string;
  updatedAt: string;
  action: any;
}

const Columns: TableProps<DataType>["columns"] = [
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
  const caseId = useAppSelector(state => state.form.caseId);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const role = useAppSelector(state => state.auth.role);
  const progress = useAppSelector(state => state.form.applicationCase.progress);
  const percentage = useAppSelector(state => state.form.percentage);
  const mergedDocuments = useAppSelector(state => state.form.mergedDocuments);
  const [loading, setLoading] = useState(false);
  const [replaceLoading, setReplaceLoading] = useState(false);
  const replaceFileControl = useRef<HTMLInputElement | null>(null);
  const [canMerge, setCanMerge] = useState(false);
  const [missingDocs, setMissingDocs] = useState<string[]>([]);
  const systemMergedDocumentType = { generationType: "SYSTEM_MERGED" };
  const [allMergeCompleted, setAllMergeCompleted] = useState(false);

  useEffect(() => {
    if (!accessToken || !caseId || caseId === 0) {
      console.error("Access token or case id is missing");
      return;
    }
    if (replaceLoading || replaceLoading === undefined || replaceLoading === null) {
      return;
    }

    setLoading(true);

    getDocumentsApi(accessToken, caseId, role, systemMergedDocumentType)
      .then(documents => {
        if (!documents) {
          console.error("Failed to get documents");
          return;
        }
        const allFinished = !documents.some(doc => doc.status === "In Progress");
        setAllMergeCompleted(allFinished);
        dispatch(updateMergedDocuments(documents));
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });

    canMergeDocumentForCase(caseId, accessToken, role)
      .then(result => {
        setCanMerge(result.status);
        if (result.missingFields.length > 0) {
          setMissingDocs(result.missingFields);
        }
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
    setLoading(false);
  }, [caseId, accessToken, role]);

  const onReplaceLinkClick = () => {
    if (replaceFileControl.current) {
      setReplaceLoading(true);
      replaceFileControl.current.click();
    }
  };

  const onDownloadClick = async (doc: GeneratedDocument) => {
    if (!accessToken) {
      message.error("Access token is missing");
      return;
    }
    try {
      const docWithPresignedUrl = await getDocumentByIdApi(accessToken, doc.id, role);
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

  const generateDocument = async () => {
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
          const allFinished = documentsToUpdate.every(doc => doc.status === "Success");
          setAllMergeCompleted(allFinished);
          dispatch(updateGeneratedDocuments(documentsToUpdate));
          return allFinished;
        },
        systemMergedDocumentType,
      );
    } catch (error) {
      console.error("Error generating documents: ", error);
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
            updateDocumentStatus(role, documentId, true, "UPLOADED", accessToken).then(isSuccessful => {
              if (isSuccessful) {
                setReplaceLoading(false);
                console.log("File uploaded successfully");
              }
            });
          },
          (error: Error) => {
            updateDocumentStatus(role, documentId, true, "FAILED", accessToken).then(isSuccessful => {
              if (isSuccessful) {
                setReplaceLoading(false);
                console.log("File error status updated successfully");
              }
            });
            console.error("Error uploading file: ", error);
          },
        );
      });
    }
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
                    const document = await getDocumentByIdApi(accessToken, doc.id, role);
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
        status: <Status status={doc.status} />,
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
          <Button type="primary" onClick={generateDocument} className="document-list-btn" disabled={!canMerge}>
            {t("Generate Merged Documents")}
          </Button>
        </Tooltip>
        <Button
          type="primary"
          onClick={markLawyerReviewAsCompleted}
          className="document-list-btn"
          disabled={percentage?.["overall"]?.avg !== 100 || !allMergeCompleted}
        >
          {t("Complete Review")}
        </Button>
        <Table
          loading={loading || replaceLoading}
          bordered={false}
          columns={Columns?.map(c => ({ ...c, title: t(c.title as string) }))}
          dataSource={uploadedDocumentsInTable}
        />
      </div>
    </div>
  );
}
