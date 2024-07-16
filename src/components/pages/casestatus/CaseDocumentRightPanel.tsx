import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Input, message, Modal, Select, Space, Table, Upload, UploadProps } from "antd";
import { useTranslation } from "react-i18next";
import {
  AudioTwoTone,
  FileImageTwoTone,
  FilePdfTwoTone,
  FileTextTwoTone,
  FileUnknownTwoTone,
  FileWordTwoTone,
  InboxOutlined,
  VideoCameraTwoTone,
} from "@ant-design/icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  deleteDocumentApi,
  generateDocumentPresignedUrl,
  getDocumentByIdApi,
  getDocumentsApi,
  getDocumentTypesApi,
  updateDocumentStatus,
  uploadFileToPresignUrl,
} from "../../../api/caseAPI";
import { useAppSelector } from "../../../app/hooks";
import { UploadedDocument, UploadedDocumentWithUrl } from "../../../model/apiModels";
import { DocumentStatus, DocumentType } from "../../../model/commonModels";
import { DeleteConfirmModal } from "../../modals/case/DeleteConfirmModal";
import { Loading } from "../../common/Loading";
import { QText } from "../../common/Fonts";
import "./CaseDocumentRightPanel.css";

const { Dragger } = Upload;
const { Option } = Select;

function useFetchDocuments(setDocuments: (docs: UploadedDocumentWithUrl[]) => void) {
  const { id: caseId } = useParams<{ id?: string }>();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const userRole = useAppSelector(state => state.auth.role);
  const [loading, setLoading] = useState(false);

  const fetchDocuments = useCallback(async () => {
    if (!accessToken || !caseId || !userRole) {
      message.error("Access token, case ID, or user role is missing");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const documents: UploadedDocument[] = await getDocumentsApi(accessToken, Number(caseId), userRole);
      const documentsWithUrl: UploadedDocumentWithUrl[] = documents.map(doc => ({
        ...doc,
        document: new Blob(),
      }));
      setDocuments(documentsWithUrl);
    } catch (error) {
      message.error("Error fetching documents");
    } finally {
      setLoading(false);
    }
  }, [accessToken, caseId, userRole, setDocuments]);

  useEffect(() => {
    fetchDocuments();
  }, [accessToken]);

  return { loading, fetchDocuments };
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
  const { loading, fetchDocuments } = useFetchDocuments(setDocuments);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [selectedDocumentType, setSelectedDocumentType] = useState<DocumentType>("OTHER");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<{ id: number; name: string } | null>(null);
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [onDropFileCount, setOnDropFileCount] = useState(0);
  // Update the search query state and URL when the search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  // Apply the search filter and update the URL
  const handleSearch = () => {
    const queryParams = new URLSearchParams(location.search);
    if (searchQuery) {
      queryParams.set("search", searchQuery);
    } else {
      queryParams.delete("search");
    }
    navigate(`?${queryParams.toString()}`);

    // Filter documents based on the search query
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
    if (!accessToken || documentToDelete === null) {
      message.error("Access token is missing or no document selected for deletion");
      return;
    }
    try {
      console.log("delete documentId", documentToDelete.id);
      const successDelete = await deleteDocumentApi(userRole, documentToDelete.id, accessToken);
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
      if (!accessToken) {
        message.error("Access token is missing");
        return;
      }
      await updateDocumentStatus(userRole, documentId, true, documentStatus, accessToken);
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

  const handleClearSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === "") {
      const queryParams = new URLSearchParams(location.search);
      queryParams.delete("search");
      navigate({ search: queryParams.toString() });
      setFilteredDocuments(documents);
    }
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

  const getFileType = (fileExt: string) => {
    switch (fileExt.toLowerCase()) {
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
        return "image";
      case "pdf":
        return "pdf";
      case "doc":
      case "docx":
      case ".pages":
        return "word";
      case "txt":
      case "md":
        return "text";
      case "mp4":
      case "avi":
      case "mov":
      case "wmv":
      case "mkv":
        return "video";
      case "mp3":
      case "wav":
      case "aac":
      case "flac":
      case "ogg":
        return "audio";

      default:
        return "unsupported";
    }
  };

  const getFileIcon = (fileName: string) => {
    if (!fileName) {
      return <FileUnknownTwoTone style={{ fontSize: 80 }} twoToneColor="#27AE60" />;
    }

    const fileExtension = fileName.split(".").pop()?.toLowerCase();
    if (!fileExtension) {
      return <FileUnknownTwoTone style={{ fontSize: 80 }} twoToneColor="#27AE60" />;
    }

    const fileType = getFileType(fileExtension);
    switch (fileType) {
      case "image":
        return <FileImageTwoTone style={{ fontSize: 80 }} twoToneColor="#27AE60" />;
      case "word":
        return <FileWordTwoTone style={{ fontSize: 80 }} twoToneColor="#27AE60" />;
      case "text":
        return <FileTextTwoTone style={{ fontSize: 80 }} twoToneColor="#27AE60" />;
      case "video":
        return <VideoCameraTwoTone style={{ fontSize: 80 }} twoToneColor="#27AE60" />;
      case "audio":
        return <AudioTwoTone style={{ fontSize: 80 }} twoToneColor="#27AE60" />;
      case "pdf":
        return <FilePdfTwoTone style={{ fontSize: 80 }} twoToneColor="#27AE60" />;
      default:
        return <FileUnknownTwoTone style={{ fontSize: 80 }} twoToneColor="#27AE60" />;
    }
  };

  const handlePreview = async (documentId: number) => {
    if (!accessToken) {
      message.error("Access token is missing");
      return;
    }
    try {
      const document = await getDocumentByIdApi(accessToken, documentId, userRole);
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
    if (!accessToken) {
      message.error("Access token is missing");
      return;
    }
    try {
      const response = await fetch(document.presignUrl);
      if (!response.ok) {
        throw new Error(`Failed to download document from ${document.presignUrl}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = window.document.createElement("a"); // Use window.document
      a.href = url;
      a.download = document.name;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      message.error("Error downloading document");
      console.error(error);
    }
  };

  const dataSource = filteredDocuments.map(doc => ({
    key: doc.id,
    type: doc.type,
    name: doc.name,
    uploader: userRole,
    fileType: doc.name.split(".").pop()?.toUpperCase(),
    updatedAt: doc.createdAt,
    action: (
      <Space size="small">
        <a onClick={() => handleDownload(doc)}>{t("Download")}</a>
        {/* Hide delete in case any useful document is mistakenly deleted.*/}
        <a
          onClick={() => {
            setDocumentToDelete({ id: doc.id, name: doc.name });
            setDeleteConfirmVisible(true);
          }}
        >
          {t("Delete")}
        </a>
      </Space>
    ),
  }));

  const convertBackendDocTypeToFrontendType = (type: DocumentType) => {
    switch (type.toUpperCase()) {
      case "PASSPORT_MAIN":
        return t("Passport Main");
      case "ID_CARD":
        return t("ID Card");
      case "TRAVEL_ID":
        return t("Travel ID");
      case "PASSPORT_FULL":
        return t("Passport Full");
      case "DELIVERY_PACKAGE_PHOTO":
        return t("Delivery Package Photo");
      case "G28":
        return t("G28");
      case "I589":
        return t("I589");
      case "I589_SUPPLEMENT":
        return t("I589 Supplement");
      case "PERSONAL_STATEMENT":
        return t("Personal Statement");
      case "PERSONAL_STATEMENT_ORIGINAL":
        return t("Personal Statement Original");
      case "PERSONAL_STATEMENT_CHINESE":
        return t("Personal Statement Chinese");
      case "PERSONAL_STATEMENT_ENGLISH":
        return t("Personal Statement English");
      case "CERTIFICATE_OF_TRANSLATION_FOR_PERSONAL_STATEMENT":
        return t("Certificate of Translation for Personal Statement");
      case "MARRIAGE_CERTIFICATE_CHINESE":
        return t("Marriage Certificate Chinese");
      case "MARRIAGE_CERTIFICATE_ENGLISH":
        return t("Marriage Certificate English");
      case "CERTIFICATE_OF_TRANSLATION_FOR_MARRIAGE_CERTIFICATE":
        return t("Certificate of Translation for Marriage Certificate");
      case "COVER_LETTER_FOR_AFFIRMATIVE_ASYLUM":
        return t("Cover Letter for Affirmative Asylum");
      case "I94":
        return t("I94");
      case "EOIR28":
        return t("EOIR28");
      case "WRITTEN_PLEADING":
        return t("Written Pleading");
      case "SUPPORTING_DOCUMENT":
        return t("Supporting Document");
      case "OTHER":
        return t("Other");
      case "EOIR_COVERLETTER_FOR_I589_FORM":
        return t("EOIR Cover Letter for I589 Form");
      case "EOIR_COVERLETTER_FOR_PERSONAL_STATEMENT":
        return t("EOIR Cover Letter for Personal Statement");
      case "EOIR_COVERLETTER_FOR_WRITTEN_PLEADING":
        return t("EOIR Cover Letter for Written Pleading");
      case "EOIR_COVERLETTER_FOR_SUPPORTING_DOCUMENTS":
        return t("EOIR Cover Letter for Supporting Documents");
      case "EOIR_PROOFOFSERVICE_FOR_I589_FORM":
        return t("EOIR Proof of Service for I589 Form");
      case "EOIR_PROOFOFSERVICE_FOR_PERSONAL_STATEMENT":
        return t("EOIR Proof of Service for Personal Statement");
      case "EOIR_PROOFOFSERVICE_FOR_WRITTEN_PLEADING":
        return t("EOIR Proof of Service for Written Pleading");
      case "EOIR_PROOFOFSERVICE_FOR_SUPPORTING_DOCUMENTS":
        return t("EOIR Proof of Service for Supporting Documents");
      case "MERGED_I589_FOR_DEFENSIVE_ASYLUM":
        return t("Merged I589 for Defensive Asylum");
      case "MERGED_PERSONAL_STATEMENT_FOR_DEFENSIVE_ASYLUM":
        return t("Merged Personal Statement for Defensive Asylum");
      case "MERGED_WRITTEN_PLEADING_FOR_DEFENSIVE_ASYLUM":
        return t("Merged Written Pleading for Defensive Asylum");
      case "MERGED_SUPPORTING_DOCUMENTS_FOR_DEFENSIVE_ASYLUM":
        return t("Merged Supporting Documents for Defensive Asylum");
      case "MERGED_DOCUMENT_FOR_AFFIRMATIVE_ASYLUM":
        return t("Merged Document for Affirmative Asylum");
      case "SIGNED_MERGED_I589_FOR_DEFENSIVE_ASYLUM":
        return t("Signed Merged I589 for Defensive Asylum");
      case "SIGNED_MERGED_PERSONAL_STATEMENT_FOR_DEFENSIVE_ASYLUM":
        return t("Signed Merged Personal Statement for Defensive Asylum");
      case "SIGNED_MERGED_WRITTEN_PLEADING_FOR_DEFENSIVE_ASYLUM":
        return t("Signed Merged Written Pleading for Defensive Asylum");
      case "SIGNED_MERGED_SUPPORTING_DOCUMENTS_FOR_DEFENSIVE_ASYLUM":
        return t("Signed Merged Supporting Documents for Defensive Asylum");
      case "SIGNED_MERGED_DOCUMENT_FOR_AFFIRMATIVE_ASYLUM":
        return t("Signed Merged Document for Affirmative Asylum");
      case "SIGNED":
        return t("Signed");
      case "APPLICATION_RECEIPT":
        return t("Application Receipt");
      case "BIOMETRICS_RECEIPT":
        return t("Biometrics Receipt");
      case "INTERVIEW_RECEIPT":
        return t("Interview Receipt");
      case "FINAL_RESULT_RECEIPT":
        return t("Final Result Receipt");
      case "ALL":
        return t("All");
      case "MERGE":
        return t("Merge");
      default:
        return t("Other");
    }
  };

  const columns = [
    {
      title: t("Category"),
      dataIndex: "type",
      key: "type",
      width: "13%",
      render: (type: DocumentType) => convertBackendDocTypeToFrontendType(type),
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
      width: "12%",
    },
    {
      title: t("File Type"),
      dataIndex: "fileType",
      key: "fileType",
      width: "10%",
    },
    {
      title: t("Updated At"),
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      render: text => <QText level="xsmall">{new Date(text).toLocaleString()}</QText>,
      width: "22%",
    },
    {
      title: t("Action"),
      dataIndex: "action",
      key: "action",
      width: "18%",
    },
  ];

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
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
      <div>
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
        <div className="case-document-file-table">
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
          <Button key="Upload" type="primary" loading={loading} onClick={handleModalOk}>
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
