import { Button, message, Upload, UploadProps } from "antd";
import React, { useRef, useState } from "react";
import { updateDocumentStatus, uploadFileToPresignUrl } from "../../../api/documentAPI";
import { generateDocumentPresignedUrl } from "../../../api/documentAPI";
import { useAppSelector } from "../../../app/hooks";
import { DocumentOperation, DocumentStatus, DocumentType, Identity } from "../../../model/commonModels";
import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export interface MultipleFileUploaderProps {
  documentType: DocumentType;
  identity: Identity;
  operation?: DocumentOperation;
  description?: string;
  documentIds?: number[];
}

export function DraggerFileUploader(props: MultipleFileUploaderProps) {
  const userId = useAppSelector(state => state.auth.userId);
  const caseId = useAppSelector(state => state.form.caseId);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const role = useAppSelector(state => state.auth.role);

  const [loading, setLoading] = useState(false);
  const fileListRef = useRef<File[]>([]);
  const { t } = useTranslation();
  const { Dragger } = Upload;
  const [confirmDisabled, setConfirmDisabled] = useState(true);

  const handleUpload = (file: File) => {
    const isPdfOrImage = file.type === "application/pdf" || file.type.startsWith("image/");
    if (!isPdfOrImage) {
      message.error(`${file.name} is not a PDF or image file.`);
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const handleFileChange = async ({ file, fileList }: any) => {
    // Handle de-select file from dragger
    if (file.status === "removed") {
      fileListRef.current = fileList;
      return;
    }
    // Handle select new file
    const isPdfOrImage = file.type ? file.type === "application/pdf" || file.type.startsWith("image/") : false;
    if (isPdfOrImage) {
      try {
        fileListRef.current.push(file);
        setConfirmDisabled(false);
      } catch (err) {
        console.error(err);
        message.error(`Failed to get presigned URL for ${file.name}.`);
      }
    } else {
      message.error(`${file.name} is not a PDF or image file.`);
    }
  };

  const onConfirmButtonClick = async (
    type: DocumentType,
    uploadFileDescription: string,
    callback?: (documentIds: number[]) => void,
  ) => {
    const documentIds: number[] = [];
    try {
      setLoading(true);
      for (const file of fileListRef.current) {
        const createdBy = role === "APPLICANT" ? "APPLICANT" : "LAWYER";
        const selectedOperation = "NEW";
        if (!accessToken || !userId || !caseId) {
          message.error("Access token, userId or caseId is missing");
          return;
        }
        const presignedUrlResponse = await generateDocumentPresignedUrl(
          userId,
          caseId,
          type,
          file.name,
          "Applicant",
          selectedOperation,
          uploadFileDescription,
          createdBy,
          accessToken,
          role,
        );

        const documentId = presignedUrlResponse.documentId;
        documentIds.push(documentId);
        console.log("new documentId", documentId);

        await uploadFileToPresignUrl(
          presignedUrlResponse.presignedUrl,
          file,
          onProgress,
          () => onSuccess(file, documentId),
          error => onError(error, file, documentId),
        );
      }
      setLoading(false);
      setConfirmDisabled(false);
      if (callback) {
        callback(documentIds);
      }
      return documentIds;
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  const onProgress = (percent: number) => {
    console.log(percent);
  };

  const onSuccess = async (file: File, documentId: number) => {
    message.success(`${file.name} file uploaded successfully.`);
    await updateStatus(documentId, "UPLOADED");
  };

  const onError = async (error: Error, file: File, documentId: number) => {
    setLoading(false);
    setConfirmDisabled(true);
    message.error(`${file.name} file upload failed.`);
    await updateStatus(documentId, "FAILED");
    console.error(error);
  };

  const onUploadComplete = async (documentIds: number[]) => {
    console.log("Upload Completed!");
  };

  const updateStatus = async (documentId: number, documentStatus: DocumentStatus) => {
    try {
      if (!accessToken) {
        message.error("Access token is missing");
        return;
      }
      await updateDocumentStatus(role, documentId, true, documentStatus, accessToken, caseId);
    } catch (error) {
      console.error(`Failed to update document status: ${error}`);
    }
  };

  const uploadProps: UploadProps = {
    beforeUpload: handleUpload,
    onChange: handleFileChange,
    multiple: true,
  };

  return (
    <div className="dragger-file-uploader-container" style={{ width: "25%" }}>
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">{t("Click or drag file to this area to upload")}</p>
      </Dragger>
      <Button
        type="primary"
        size="large"
        onClick={() => onConfirmButtonClick("DELIVERY_PACKAGE_PHOTO", "Delivery Package Photo", onUploadComplete)}
        disabled={confirmDisabled}
      >
        {loading ? <LoadingOutlined /> : t("Confirm")}
      </Button>
    </div>
  );
}
