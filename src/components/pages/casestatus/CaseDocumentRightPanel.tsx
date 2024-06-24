import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  message,
  Upload,
  Alert,
  Modal,
  Select,
  Space,
  Table,
} from "antd";
import { useTranslation } from "react-i18next";
import { InboxOutlined, FileOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import {
  getDocumentsApi,
  uploadFileToPresignUrl,
  generateDocumentPresignedUrl,
  getDocumentByIdApi,
  updateDocumentStatus,
} from "../../../api/caseAPI";
import { useAppSelector } from "../../../app/hooks";
import { UploadedDocument } from "../../../model/apiModels";
import {
  DocumentStatus,
  DocumentType,
  Identity,
} from "../../../model/commonModels";
import { Loading } from "../../common/Loading";
import { QText } from "../../common/Fonts";
import "./CaseDocumentRightPanel.css";

const { Dragger } = Upload;
const { Option } = Select;

function useFetchDocuments() {
  const { id } = useParams<{ id?: string }>();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const userRole = useAppSelector(state => state.auth.role);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);

  const fetchDocuments = useCallback(async () => {
    if (!accessToken) {
      setError("Access token is missing");
      return;
    }
    if (!id) {
      setError("Invalid case ID");
      return;
    }
    if (!userRole) {
      setError("User role is missing");
      return;
    }
    try {
      setLoading(true);
      const documents = await getDocumentsApi(
        accessToken,
        Number(id),
        userRole,
      );
      setDocuments(documents);
    } catch (error) {
      message.error("Error fetching documents");
      setError("Failed to fetch documents. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [accessToken, id, userRole]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return { loading, error, documents, fetchDocuments };
}

const CaseDocumentRightPanel: React.FC = () => {
  const { t } = useTranslation();
  const { id: caseId } = useParams<{ id: string }>();
  const userId = useAppSelector(state => state.auth.userId);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const userRole = useAppSelector(state => state.auth.role);
  const { loading, error, documents, fetchDocuments } = useFetchDocuments();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [selectedDocumentType, setSelectedDocumentType] =
    useState<DocumentType>("PASSPORT_MAIN");

  const handleDownload = async (documentId: number) => {
    if (!accessToken) {
      message.error("Access token is missing");
      return;
    }
    try {
      const document = await getDocumentByIdApi(
        accessToken,
        documentId,
        userRole,
      );
      if (!document.presignUrl) {
        message.error("Presigned URL is missing");
        return;
      }
      window.open(document.presignUrl, "_blank");
    } catch (error) {
      message.error("Error downloading document");
      console.error(error);
    }
  };

  const handleDelete = (id: number) => {
    // Needs deleteDocument API
    message.success(`Document ${id} deleted successfully.`);
  };

  const handleUpload = async (options: any) => {
    const { file } = options;
    setCurrentFile(file);
    setIsModalVisible(true);
  };

  const updateStatus = async (
    documentId: number,
    documentStatus: DocumentStatus,
  ) => {
    try {
      if (!accessToken) {
        message.error("Access token is missing");
        return;
      }
      await updateDocumentStatus(
        userRole,
        documentId,
        true,
        documentStatus,
        accessToken,
      );
    } catch (error) {
      console.error(`Failed to update document status: ${error}`);
    }
  };

  const uploadProps = {
    customRequest: handleUpload,
    multiple: true,
    onChange(info: any) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleModalOk = async () => {
    if (currentFile && userId && caseId && accessToken) {
      const createdBy = userRole === "APPLICANT" ? "APPLICANT" : "LAWYER";
      const fileExt = currentFile.name.split(".").pop();
      const description = `This is a ${selectedDocumentType} file, its file type is ${fileExt}`;

      const selectedOperation = "NEW";

      try {
        const presignedUrlResponse = await generateDocumentPresignedUrl(
          userId,
          parseInt(caseId),
          selectedDocumentType,
          currentFile.name,
          "Applicant",
          selectedOperation,
          description,
          createdBy,
          accessToken,
          userRole,
        );

        const documentId = presignedUrlResponse.documentId;

        await updateStatus(documentId, "UPLOADING");

        await uploadFileToPresignUrl(
          presignedUrlResponse.presignedUrl,
          currentFile,
          percent => console.log(`Upload Progress: ${percent}%`),
          async () => {
            message.success(`${currentFile.name} file uploaded successfully.`);
            await updateStatus(documentId, "UPLOADED");
            fetchDocuments();
          },
          async error => {
            message.error(`${currentFile.name} file upload failed.`);
            await updateStatus(documentId, "FAILED");
            console.error(error);
          },
        );
      } catch (error) {
        message.error("Error generating presigned URL");
        console.error(error);
      }
    }
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const dataSource = documents.map(doc => ({
    key: doc.id,
    type: doc.type,
    name: doc.name,
    uploader: userRole,
    fileType: doc.name.split(".").pop()?.toUpperCase(),
    uploadedAt: doc.createdAt,
  }));

  const columns = [
    {
      title: t("Category"),
      dataIndex: "type",
      key: "type",
    },
    {
      title: t("File Name"),
      dataIndex: "name",
      key: "name",
      render: text => <a>{text}</a>,
    },
    {
      title: t("Uploader"),
      dataIndex: "uploader",
      key: "uploader",
    },
    {
      title: t("File Type"),
      dataIndex: "fileType",
      key: "fileType",
    },
    {
      title: t("UploadedAt"),
      dataIndex: "uploadedAt",
      key: "uploadedAt",
      render: text => <a>{new Date(text).toLocaleString()}</a>,
    },
    {
      title: t("Action"),
      key: "action",
      render: (_, document) => (
        <Space size="small">
          <a onClick={() => handleDownload(document.key)}>{t("Download")}</a>
          <a onClick={() => handleDelete(document.key)}>{t("Delete")}</a>
        </Space>
      ),
    },
  ];

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <Card className="case-document-right-panel">
      {/* Upload document section */}
      <div className="case-document-file-upload">
        <div className="case-document-section-header">
          <QText level="large">{t("UploadDocument")}</QText>
        </div>
        <div className="case-document-section-content">
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ color: "#27AE60" }} />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
        </div>
      </div>
      {/* Document display section */}
      <div className="case-document-file-list">
        <div className="case-document-section-header">
          <QText level="large">{t("CaseDocument")}</QText>
        </div>
        <div className="case-document-section-content">
          <Table columns={columns} dataSource={dataSource} />
        </div>
      </div>

      {/* Pop up modal section */}
      <Modal
        title={t("UploadDocument")}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <FileOutlined style={{ fontSize: 32, marginRight: 16 }} />
          <div>
            <p>{currentFile?.name}</p>
            <Select
              defaultValue={selectedDocumentType}
              style={{ width: 200 }}
              onChange={(value: DocumentType) => setSelectedDocumentType(value)}
            >
              <Option value="PASSPORT_MAIN">Passport Main</Option>
              <Option value="ID_CARD">ID Card</Option>
              <Option value="I94">I94</Option>
              <Option value="PASSPORT_FULL">Passport Full</Option>
              <Option value="TRAVEL_ID">Travel ID</Option>
            </Select>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default CaseDocumentRightPanel;
