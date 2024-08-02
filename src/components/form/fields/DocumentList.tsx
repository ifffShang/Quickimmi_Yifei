import type { TableProps } from "antd";
import { Button, message, Table, Tooltip } from "antd";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  generateDocumentsByDocumentTypeApi,
  generatePresignedUrlByDocumentId,
  getDocumentByIdApi,
  retryGetDocumentsApi,
  updateDocumentStatus,
  uploadFileToPresignUrl,
} from "../../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useDocumentsOnLoad } from "../../../hooks/commonHooks";
import { GeneratedDocument } from "../../../model/apiModels";
import { DocumentGenerationTaskStatus } from "../../../model/apiReqResModels";
import { DocumentType, DocumentTypeMap } from "../../../model/commonModels";
import { clearDocumentUrls, updateGeneratedDocuments } from "../../../reducers/formSlice";
import { moveCaseProgressToNextStep } from "../../../utils/progressUtils";
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

export function DocumentList() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const caseId = useAppSelector(state => state.form.caseId);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const role = useAppSelector(state => state.auth.role);
  const profile = useAppSelector(state => state.form.applicationCase.profile);
  const progress = useAppSelector(state => state.form.applicationCase.progress);
  const percentage = useAppSelector(state => state.form.percentage);
  const generatedDocuments = useAppSelector(state => state.form.generatedDocuments);
  const [loading, setLoading] = useState(false);
  const [replaceLoading, setReplaceLoading] = useState(false);
  const replaceFileControl = useRef<HTMLInputElement | null>(null);

  useDocumentsOnLoad({
    caseId: caseId,
    accessToken: accessToken || "",
    role: role,
    setLoading: setLoading,
    dispatch: dispatch,
    onSuccess: (uploadedDocs: any[]) => {
      dispatch(updateGeneratedDocuments(uploadedDocs));
    },
    replaceLoading: replaceLoading,
  });

  const fetchGeneratedDocuments = async (generatedDocumentStatusList: DocumentGenerationTaskStatus[]) => {
    if (!accessToken || !caseId || caseId === 0) {
      console.error("Access token or case id is missing");
      return;
    }

    if (replaceLoading || replaceLoading === undefined || replaceLoading === null) {
      return;
    }

    setLoading(true);
    dispatch(clearDocumentUrls());
    try {
      const downloadPromises = generatedDocumentStatusList.map(doc => downloadDocument(doc.presignedUrl, { ...doc }));
      const generatedDocs = await Promise.all(downloadPromises);
      dispatch(updateGeneratedDocuments(generatedDocs));
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

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
    try {
      await updateApplicationCaseFunc(caseId, profile, progress, percentage, role, accessToken);
      await generateDocumentsByDocumentTypeApi(accessToken, caseId, "ALL", role);
      await retryGetDocumentsApi(accessToken, caseId, role, (documents, timeout) => {
        if (timeout) {
          console.error("Document generation timeout.");
        }
        setLoading(false);
        const documentsToUpdate = [...documents];
        let allFinished = true;
        for (let i = 0; i < documentsToUpdate.length; i++) {
          const status = documentsToUpdate[i];
          if (status.status !== "Success") {
            allFinished = false;
          }
        }
        dispatch(updateGeneratedDocuments(documentsToUpdate));
        return allFinished;
      });

      setLoading(false);
    } catch (error) {
      console.error("Error generating documents: ", error);
      setLoading(false);
    }
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

  const uploadedDocumentsInTable = generatedDocuments
    .filter(doc => doc.generationType === "system_auto_generated")
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
                <a href="#" onClick={onReplaceLinkClick}>
                  {t("Replace")}
                </a>
                <input
                  type="file"
                  id="file"
                  ref={replaceFileControl}
                  onChange={e => onReplaceFileUpload(e, doc.id, DocumentTypeMap[doc.name])}
                  style={{ display: "none" }}
                />
              </div>
            )}
          </>
        ),
      };
    });

  const documentsExist = uploadedDocumentsInTable.length > 0;
  const tooltipText =
    percentage?.["overall"]?.avg !== 100
      ? t("The button will only be available when the form is 100% complete.")
      : documentsExist
        ? t("Documents already generated")
        : "";

  return (
    <div className="document-list">
      <div className="document-list-inner">
        <Tooltip title={tooltipText}>
          <Button
            type="primary"
            onClick={generateDocument}
            className="document-list-btn"
            disabled={percentage?.["overall"]?.avg !== 100}
          >
            {t("Generate Documents")}
          </Button>
        </Tooltip>
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
