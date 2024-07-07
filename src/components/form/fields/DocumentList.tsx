import type { TableProps } from "antd";
import { Button, Table, Tooltip } from "antd";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  generateDocumentsApi,
  generatePresignedUrlByDocumentId,
  getDocumentsApi,
  updateDocumentStatus,
  uploadFileToPresignUrl,
} from "../../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useDocumentsOnLoad } from "../../../hooks/commonHooks";
import { DocumentType, DocumentTypeMap } from "../../../model/commonModels";
import { clearDocumentUrls, updateUploadedDocuments } from "../../../reducers/formSlice";
import { downloadDocument } from "../../../utils/utils";
import "./DocumentList.css";

const IncludedFileTypes = ["asylum_coverletter", "g-28", "i-589"];

interface DataType {
  key: number;
  filename: any;
  filetype: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  action: any;
}

const Columns: TableProps<DataType>["columns"] = [
  {
    title: "File Name",
    dataIndex: "filename",
    key: "name",
    sorter: (a, b) => a.filename.localeCompare(b.filename),
  },
  {
    title: "File Type",
    dataIndex: "filetype",
    key: "filetype",
    responsive: ["lg"],
    sorter: (a, b) => a.filename.localeCompare(b.filename),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    sorter: (a, b) => a.filename.localeCompare(b.filename),
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    responsive: ["lg"],
    sorter: (a, b) => a.filename.localeCompare(b.filename),
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
    key: "updatedAt",
    sorter: (a, b) => a.filename.localeCompare(b.filename),
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
  const uploadedDocuments = useAppSelector(state => state.form.uploadedDocuments);
  const [loading, setLoading] = useState(false);
  const [replaceLoading, setReplaceLoading] = useState(false);
  const replaceFileControl = useRef<HTMLInputElement | null>(null);

  useDocumentsOnLoad({
    caseId: caseId,
    accessToken: accessToken || "",
    role: role,
    setLoading: setLoading,
    dispatch: dispatch,
    replaceLoading: replaceLoading,
  });

  const fetchDocuments = async () => {
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
      const documents = await getDocumentsApi(accessToken, caseId, role);
      if (!documents) {
        throw new Error("Failed to get documents");
      }
      const downloadPromises = documents
        .filter(doc => doc.status === "uploaded")
        .map(doc => downloadDocument(doc.presignUrl, { ...doc }));

      const uploadedDocs = await Promise.all(downloadPromises);
      dispatch(updateUploadedDocuments(uploadedDocs));
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

  const generateDocument = async () => {
    if (!caseId || !accessToken) {
      console.error("Case ID or access token is not available");
      return;
    }
    setLoading(true);
    try {
      const isSuccessful = await generateDocumentsApi(accessToken, caseId, role);
      if (isSuccessful) {
        setTimeout(async () => {
          await fetchDocuments();
          setLoading(false);
        }, 2000);
      } else {
        console.error("Document generation failed");
        setLoading(false);
      }
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
          (percent: number) => {},
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

  const uploadedDocumentsInTable = uploadedDocuments
    .filter(doc => IncludedFileTypes.includes(doc.type))
    .map(doc => {
      return {
        key: doc.id,
        filename: (
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              let fileUrl = "";
              if (doc.name.indexOf(".pdf") > -1) {
                fileUrl = URL.createObjectURL(new Blob([doc.document], { type: "application/pdf" }));
              } else {
                fileUrl = URL.createObjectURL(doc.document);
              }
              window.open(fileUrl, "_blank");
            }}
          >
            {doc.name}
          </a>
        ),
        filetype: doc.type,
        status: doc.status,
        createdAt: doc.createdAt ? new Date(doc.createdAt).toLocaleString() : "-",
        updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toLocaleString() : "-",
        action: (
          <div className="document-list-action">
            <a download={doc.name} href={URL.createObjectURL(doc.document)}>
              {t("Download")}
            </a>
            <a href="#" onClick={onReplaceLinkClick}>
              {t("Replace")}
            </a>
            <input
              type="file"
              id="file"
              ref={replaceFileControl}
              onChange={e => onReplaceFileUpload(e, doc.id, DocumentTypeMap[doc.type])}
              style={{ display: "none" }}
            />
          </div>
        ),
      };
    });

  const documentsExist = uploadedDocumentsInTable.length > 0;

  return (
    <div className="document-list">
      <div className="document-list-inner">
        <Tooltip title={documentsExist ? t("Documents already generated") : ""}>
          <Button type="primary" onClick={generateDocument} className="document-list-btn" disabled={documentsExist}>
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
