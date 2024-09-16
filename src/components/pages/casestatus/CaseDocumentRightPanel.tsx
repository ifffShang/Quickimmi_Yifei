import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Card, Input, message, Modal, Select, Space, Table, Tooltip, Upload, UploadProps } from "antd";
import { useTranslation } from "react-i18next";
import { InboxOutlined } from "@ant-design/icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  deleteDocumentApi,
  generateDocumentPresignedUrl,
  getDocumentByIdApi,
  getDocumentsApi,
  getDocumentTypesApi,
  updateDocumentStatus,
  uploadFileToPresignUrl,
} from "../../../api/documentAPI";
import { useAppSelector } from "../../../app/hooks";
import { UploadedDocument, UploadedDocumentWithUrl } from "../../../model/apiModels";
import { DocumentStatus, DocumentType } from "../../../model/commonModels";
import { DeleteConfirmModal } from "../../modals/case/DeleteConfirmModal";
import { getFileIcon, getFileType } from "../../../utils/fileIconUtils";
import { Loading } from "../../common/Loading";
import { QText } from "../../common/Fonts";
import "./CaseDocumentRightPanel.css";
import { convertDocTypeToCategory } from "../../../utils/documentUtils";

const { Dragger } = Upload;
const { Option } = Select;

function useFetchDocuments(setDocuments: (docs: UploadedDocumentWithUrl[]) => void) {
  const { id: caseId } = useParams<{ id?: string }>();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const userRole = useAppSelector(state => state.auth.role);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    if (!accessToken || !caseId || !userRole) {
      message.error("Access token, case ID, or user role is missing");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const documentsStatusToInclude = ["Success", "uploaded"];
      const documents: UploadedDocument[] = await getDocumentsApi(accessToken, parseInt(caseId), userRole);
      const filteredDocuments = documents.filter(doc => documentsStatusToInclude.includes(doc.status));
      const documentsWithUrl: UploadedDocumentWithUrl[] = filteredDocuments.map(doc => ({
        ...doc,
        document: new Blob(),
      }));
      setDocuments(documentsWithUrl);
    } catch (error: any) {
      console.error(error);
      let errMsg = "Failed to fetch document. Please try again later.";
      if (error?.message?.includes("403") || error?.status === 403) {
        errMsg = "Forbidden: You do not have permission to access this resource.";
      }
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  }, [accessToken, caseId, userRole, setDocuments]);

  useEffect(() => {
    fetchDocuments();
  }, [accessToken]);

  return { error, loading, fetchDocuments };
}

const CaseDocumentRightPanel: React.FC = () => {
  const { t } = useTranslation();
  const { id: caseId } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const userId = useAppSelector(state => state.auth.userId);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const userRole = useAppSelector(state => state.auth.role);
  const [documents, setDocuments] = useState<UploadedDocumentWithUrl[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<UploadedDocumentWithUrl[]>([]);
  const { error, loading, fetchDocuments } = useFetchDocuments(setDocuments);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [selectedDocumentType, setSelectedDocumentType] = useState<DocumentType>("OTHER");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<{ id: number; name: string } | null>(null);
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [onDropFileCount, setOnDropFileCount] = useState(0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() === "") {
      const queryParams = new URLSearchParams(location.search);
      queryParams.delete("search");
      navigate({ search: queryParams.toString() });
      setFilteredDocuments(documents);
    }
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams(location.search);
    if (searchQuery) {
      queryParams.set("search", searchQuery);
    } else {
      queryParams.delete("search");
    }
    navigate(`?${queryParams.toString()}`);

    if (searchQuery.trim() === "") {
      setFilteredDocuments(documents);
    } else {
      setFilteredDocuments(documents.filter(doc => doc.name.toLowerCase().includes(searchQuery.toLowerCase())));
    }
  };
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get("type") || "";
    const search = queryParams.get("search") || "";
    setSearchQuery(search);

    if (type) {
      setFilteredDocuments(documents.filter(doc => doc.type.toLowerCase() === type.toLowerCase()));
    } else {
      setFilteredDocuments(documents);
    }
  }, [location.search, documents]);

  const handleUpload = async (fileList: any) => {
    if (onDropFileCount > 1) {
      message.error({
        content: "Please upload only one file at a time",
        style: {
          marginTop: "67px",
          marginLeft: "200px",
        },
      });
      setIsModalVisible(false);
      setOnDropFileCount(0);
    } else {
      const { file } = fileList;
      console.log("Uploading file", file);
      setCurrentFile(file);
      setIsModalVisible(true);
    }
  };

  const handleDelete = async () => {
    if (!accessToken || documentToDelete === null || !caseId) {
      message.error("Access token is missing or no document selected for deletion");
      return;
    }
    try {
      console.log("delete documentId", documentToDelete.id);
      const successDelete = await deleteDocumentApi(userRole, documentToDelete.id, accessToken, parseInt(caseId));
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

  const updateStatus = async (documentId: number, documentStatus: DocumentStatus) => {
    try {
      if (!accessToken || !caseId) {
        message.error("Access token is missing");
        return;
      }
      await updateDocumentStatus(userRole, documentId, true, documentStatus, accessToken, parseInt(caseId));
    } catch (error) {
      console.error(`Failed to update document status: ${error}`);
    }
  };

  const checkFileCount = (fileList: any) => {
    const fileCount = fileList.length;
    setOnDropFileCount(fileCount);
  };

  const checkFileType = (file: any) => {
    const fileExtension = file.name.split(".").pop().toLowerCase();
    const fileType = getFileType(fileExtension);
    console.log("File type in check", fileType);
    if (fileType === "unsupported") {
      message.warning({
        content: "Unsupported file type, Supported document types: image, pdf, text, video, audio",
        style: {
          marginTop: "67px",
          marginLeft: "200px",
        },
      });
      setCurrentFile(null);
      return false;
    }
    return true;
  };

  const uploadProps: UploadProps = {
    customRequest: handleUpload,
    multiple: false,
    maxCount: 1,
    beforeUpload: file => {
      if (!checkFileType(file)) {
        return Upload.LIST_IGNORE;
      }
      return true;
    },
    onDrop(info: any) {
      console.log("Dropped files", info.dataTransfer.files);
      checkFileCount(info.dataTransfer.files);
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
  }, [accessToken]);

  // Read query parameters from the URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get("type") || "";
    const search = queryParams.get("search") || "";
    setSearchQuery(search);

    let filtered = documents;

    if (type) {
      filtered = filtered.filter(doc => doc.type.toLowerCase() === type.toLowerCase());
    }

    if (search) {
      filtered = filtered.filter(doc => doc.name.toLowerCase().includes(search.toLowerCase()));
    }

    setFilteredDocuments(filtered);
  }, [location.search, documents]);

  const handlePreview = async (documentId: number) => {
    if (!accessToken || !caseId) {
      message.error("Access token is missing");
      return;
    }
    try {
      const document = await getDocumentByIdApi(accessToken, documentId, userRole, parseInt(caseId));
      if (!document.presignUrl) {
        message.error("Presigned URL is missing");
        return;
      }
      window.open(document.presignUrl, "_blank");
    } catch (error) {
      message.error("Error accessing document");
      console.error(error);
    }
  };

  const handleDownload = async (document: UploadedDocumentWithUrl) => {
    if (!accessToken || !caseId) {
      message.error("Access token is missing! Please login again.");
      return;
    }
    try {
      const docWithPresignedUrl = await getDocumentByIdApi(accessToken, document.id, userRole, parseInt(caseId));
      const response = await fetch(docWithPresignedUrl.presignUrl);
      if (!response.ok) {
        message.error("Failed to download document.");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = window.document.createElement("a");
      a.href = url;
      a.download = document.name;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      message.error("Error downloading document");
      console.error(error);
    }
  };

  const canNotDeleteFile = (doc: UploadedDocumentWithUrl) => {
    if (!doc.type) {
      return true; // Cannot delete if the type is null or undefined
    }

    return doc.type !== "other";
  };

  const dataSource = filteredDocuments.map(doc => ({
    key: doc.id,
    type: doc.type,
    name: doc.name,
    uploader: userRole,
    fileType: doc.name.split(".").pop()?.toUpperCase(),
    updatedAt: doc.updatedAt,
    action: (
      <Space size="small">
        <Button type="link" size="small" onClick={() => handleDownload(doc)}>
          {t("Download")}
        </Button>
        <Tooltip title={canNotDeleteFile(doc) ? t("DisableDocDeleteButtonText") : ""}>
          <Button
            type="link"
            size="small"
            disabled={canNotDeleteFile(doc)}
            onClick={() => {
              setDocumentToDelete({ id: doc.id, name: doc.name });
              setDeleteConfirmVisible(true);
            }}
          >
            {t("Delete")}
          </Button>
        </Tooltip>
      </Space>
    ),
  }));

  const columns = [
    {
      title: t("Category"),
      dataIndex: "type",
      key: "type",
      width: "20%",
      render: (type: DocumentType) => convertDocTypeToCategory(type.toUpperCase(), t),
    },
    {
      title: t("File Name"),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => <a onClick={() => handlePreview(record.key)}>{text}</a>,
      width: "25%",
    },
    {
      title: t("Uploader"),
      dataIndex: "uploader",
      key: "uploader",
      width: "10%",
    },
    {
      title: t("File Type"),
      dataIndex: "fileType",
      key: "fileType",
      width: "8%",
    },
    {
      title: t("Updated At"),
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      render: text => <QText level="xsmall">{new Date(text).toLocaleString()}</QText>,
      width: "18%",
    },
    {
      title: t("Action"),
      dataIndex: "action",
      key: "action",
      width: "17%",
    },
  ];

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
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
        <div className="case-document-uploader">
          <Dragger {...uploadProps} showUploadList={false} className="case-document-uploader">
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ color: "#27AE60" }} />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single document upload only. Supported document types: image, pdf, text, video and audio.
            </p>
          </Dragger>
        </div>
      </div>

      {/* Document display section */}
      <div className="case-document-section-header">
        <QText level="large">{t("CaseDocument")}</QText>
        <div className="case-document-section-search">
          <Input
            placeholder={t("InputFileNameToSearch")}
            className="case-document-section-search-input"
            onChange={handleSearchChange}
            onPressEnter={handleSearch}
            value={searchQuery}
          />
          <Button onClick={handleSearch} className="case-document-section-search-button" size="large">
            {t("Search")}
          </Button>
        </div>
      </div>
      <div className="case-document-display-section">
        <div className="case-document-file-table">
          <Table
            columns={columns}
            dataSource={dataSource}
            scroll={{ y: 350 }}
            pagination={{
              position: ["bottomCenter"],
              pageSize: 5,
            }}
          />
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
          <Button key="Upload" type="primary" loading={loading} onClick={handleModalOk}>
            {t("Upload")}
          </Button>,
        ]}
      >
        <div className="upload-modal-body">
          <div className="upload-modal-body-fileIcon">
            {getFileIcon(currentFile?.name || "", 80)}
            <QText level="xsmall" color="gray">
              {currentFile?.name}
            </QText>
          </div>
          <div className="upload-modal-body-fileInfo">
            <QText level="normal bold">{t("DocumentType")}</QText>
            <Select
              showSearch
              defaultValue={selectedDocumentType}
              style={{ width: 300 }}
              onChange={(value: DocumentType) => setSelectedDocumentType(value)}
              disabled={true}
            >
              {documentTypes.map(type => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
            <p>All document are set to default Other type</p>
          </div>
        </div>
      </Modal>

      {/* Delete confirmation modal */}
      <DeleteConfirmModal
        deleteItem="document"
        visible={deleteConfirmVisible}
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmVisible(false)}
        contentName={documentToDelete?.name}
      />
    </Card>
  );
};

export default CaseDocumentRightPanel;
