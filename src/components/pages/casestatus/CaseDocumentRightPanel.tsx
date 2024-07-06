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
  Button,
  Input,
  UploadProps,
} from "antd";
import { useTranslation } from "react-i18next";
import {
  InboxOutlined,
  FileImageTwoTone,
  FilePdfTwoTone,
  FileWordTwoTone,
  FileTextTwoTone,
  FileUnknownTwoTone,
  VideoCameraTwoTone,
  AudioTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import {
  getDocumentsApi,
  uploadFileToPresignUrl,
  generateDocumentPresignedUrl,
  getDocumentByIdApi,
  updateDocumentStatus,
  deleteDocumentApi,
  getDocumentTypesApi,
} from "../../../api/caseAPI";
import { useAppSelector } from "../../../app/hooks";
import { UploadedDocument } from "../../../model/apiModels";
import { DocumentType, DocumentStatus } from "../../../model/commonModels";
import { DeleteConfirmModal } from "../../modals/case/DeleteConfirmModal";
import { Loading } from "../../common/Loading";
import { QText } from "../../common/Fonts";
import "./CaseDocumentRightPanel.css";
import { set } from "lodash";

const { Dragger } = Upload;
const { Option } = Select;

function useFetchDocuments() {
  const { id: caseId } = useParams<{ id?: string }>();
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
    if (!caseId) {
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
        Number(caseId),
        userRole,
      );
      setDocuments(documents);
    } catch (error) {
      message.error("Error fetching documents");
      setError("Failed to fetch documents. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [accessToken, caseId, userRole]);

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
  const [selectedDocumentType, setSelectedDocumentType] = useState<DocumentType>("PASSPORT_MAIN");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredDocuments, setFilteredDocuments] = useState<UploadedDocument[]>([]);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<{id: number; name: string;} | null>(null);
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);

  const [fileLength, setFileLength] = useState(0);

  const handleUpload = async (fileList: any) => {
    if (fileLength > 1) {
      setIsModalVisible(false);
      setFileLength(0);
    } else{
      const { file } = fileList;
      console.log("Uploading file", file);
      setCurrentFile(file);
      setIsModalVisible(true);
    }
  };

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
      console.log("download documentId", documentId);
      console.log("download document url:", document.presignUrl);
    } catch (error) {
      message.error("Error downloading document");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!accessToken || documentToDelete === null) {
      message.error(
        "Access token is missing or no document selected for deletion",
      );
      return;
    }
    try {
      console.log("delete documentId", documentToDelete.id);
      const successDelete = await deleteDocumentApi(
        userRole,
        documentToDelete.id,
        accessToken,
      );
      if (successDelete) {
        message.success("Document deleted successfully");
        fetchDocuments();
      } else {
        message.error("Failed to delete document");
      }
    } catch (error) {
      message.error("Error deleting document");
      console.error(`Failed to delete document: ${error}`);
    }
    setDeleteConfirmVisible(false);
    setDocumentToDelete(null);
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

  const checkFileCount = (fileList: any) => {
    if (fileList.length > 1) {
      message.error("Only one file can be uploaded at a time");
      setCurrentFile(null);
      setIsModalVisible(false);
      return false;
    }
    return true;
  };

  const checkFileType = (file: any) => {
    const fileExtension = file.name.split(".").pop().toLowerCase();
    const fileType = getFileType(fileExtension);
    console.log("File type in check", fileType);
    if (fileType === "unsupported") {
      console.log("Unsupported file type");
      message.error("Unsupported file type");
      setCurrentFile(null);
      return false;
    }
    return true;
  };

  const uploadProps: UploadProps = {
    customRequest: handleUpload,
    multiple: false,
    maxCount: 1,
    beforeUpload: (file) => {
      if (!checkFileType(file)) {
        return Upload.LIST_IGNORE;
      }
      return true;
    },
    onDrop(info: any) {
      console.log("Dropped files", info.dataTransfer.files);
      if (!checkFileCount(info.dataTransfer.files)) {
        setFileLength(2);
        return;
      }
    },
  };

  const handleModalOk = async () => {
    if (currentFile && userId && caseId && accessToken) {
      const createdBy = userRole === "APPLICANT" ? "APPLICANT" : "LAWYER";

      const description = `This is a ${selectedDocumentType} file`;

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
        console.log("new documentId", documentId);
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
    setCurrentFile(null);
  };

  const handleClearSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredDocuments(documents);
    }
  };

  const handleSearch = () => {
    setFilteredDocuments(
      documents.filter(doc =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  };

  const fetchDocumentTypes = async () => {
    if (!accessToken) {
      message.error("Access token is missing");
      return;
    }
    try {
      const documentTypeList = await getDocumentTypesApi(accessToken, userRole);
      setDocumentTypes(documentTypeList);
    } catch (error) {
      message.error("Error fetching document types");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDocumentTypes();
  }, [accessToken, userRole]);

  const getFileType = (fileExt: string) => {
    switch (fileExt.toLowerCase()) {
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
        return("image");
      case "pdf":
        return("pdf");
      case "doc":
      case "docx":
      case ".pages":
        return("text");
      case "txt":
      case "md":
        return("text");
      case "mp4":
      case "avi":
      case "mov":
      case "wmv":
      case "mkv":
        return("video");
      case "mp3":
      case "wav":
      case "aac":
      case "flac":
      case "ogg":
        return("audio");

      default:
        return("unsupported");
    }
  };  

  const getFileIcon = (fileName: string) => {
    if (!fileName) {
      return (
        <FileUnknownTwoTone style={{ fontSize: 80 }} twoToneColor="#27AE60" />
      );
    }
  
    const fileExtension = fileName.split(".").pop()?.toLowerCase();
    if (!fileExtension) {
      return (
        <FileUnknownTwoTone style={{ fontSize: 80 }} twoToneColor="#27AE60" />
      );
    }
  
    const fileType = getFileType(fileExtension);
    switch (fileType) {
      case "image":
        return (
          <FileImageTwoTone style={{ fontSize: 80 }} twoToneColor="#27AE60" />
        );
      case "text":
        return (
          <FileTextTwoTone style={{ fontSize: 80 }} twoToneColor="#27AE60" />
        );
      case "video":
        return (
          <VideoCameraTwoTone style={{ fontSize: 80 }} twoToneColor="#27AE60" />
        );
      case "audio":
        return (
          <AudioTwoTone style={{ fontSize: 80 }} twoToneColor="#27AE60" />
        );
      case "pdf":
        return (
          <FilePdfTwoTone style={{ fontSize: 80 }} twoToneColor="#27AE60" />
        );
      default:
        return (
          <FileUnknownTwoTone style={{ fontSize: 80 }} twoToneColor="#27AE60" />
        );
    }
  }
  
  const dataSource = (
    filteredDocuments.length > 0 ? filteredDocuments : documents
  ).map(doc => ({
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
      width: "13%",
    },
    {
      title: t("File Name"),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: text => <a>{text}</a>,
      width: "25%",
    },
    {
      title: t("Uploader"),
      dataIndex: "uploader",
      key: "uploader",
      width: "12%",
    },
    {
      title: t("File Type"),
      dataIndex: "fileType",
      key: "fileType",
      width: "10%",
    },
    {
      title: t("UploadedAt"),
      dataIndex: "uploadedAt",
      key: "uploadedAt",
      sorter: (a, b) =>
        new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime(),
      render: text => <a>{new Date(text).toLocaleString()}</a>,
      width: "22%",
    },
    {
      title: t("Action"),
      key: "action",
      width: "18%",
      render: (_, document) => (
        <Space size="small">
          <a onClick={() => handleDownload(document.key)}>{t("Download")}</a>
          <a
            onClick={() => {
              setDocumentToDelete({ id: document.key, name: document.name });
              setDeleteConfirmVisible(true);
            }}
          >
            {t("Delete")}
          </a>
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
          <Dragger {...uploadProps} showUploadList={false}>
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
          <div className="case-document-section-search">
            <Input
              placeholder={t("InputFileNameToSearch")}
              onChange={handleClearSearch}
              className="case-document-section-search-input"
              value={searchQuery}
            />
            <Button
              onClick={handleSearch}
              className="case-document-section-search-button"
              size="large"
            >
              {t("Search")}
            </Button>
          </div>
        </div>
        <div className="case-document-section-content">
          <Table columns={columns} dataSource={dataSource} pagination={false} />
        </div>
      </div>

      {/* Pop up modal section */}
      <Modal
        title={t("UploadDocument")}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={640}
        className="upload-modal-container"
        footer={[
          <Button key="Back" onClick={handleModalCancel}>
            {t("Return")}
          </Button>,
          <Button
            key="Upload"
            type="primary"
            loading={loading}
            onClick={handleModalOk}
          >
            {t("Upload")}
          </Button>,
        ]}
      >
        <div className="upload-modal-body">
          <div className="upload-modal-body-fileIcon">
            {getFileIcon(currentFile?.name || "")}
            <QText level="xsmall" color="gray">
              {currentFile?.name}
            </QText>
          </div>
          <div className="upload-modal-body-fileInfo">
            <QText level="normal bold">{t("DocumentType")}</QText>
            <Select
              defaultValue={selectedDocumentType}
              style={{ width: 300 }}
              onChange={(value: DocumentType) => setSelectedDocumentType(value)}
            >
              {documentTypes.map(type => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </Modal>

      {/* Delete confirmation modal */}
      <DeleteConfirmModal
        visible={deleteConfirmVisible}
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmVisible(false)}
        contentName={documentToDelete?.name}
      />
    </Card>
  );
};

export default CaseDocumentRightPanel;
