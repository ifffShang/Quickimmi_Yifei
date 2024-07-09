import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, message, Upload, UploadProps } from "antd";
import React, { useRef, useState } from "react";
import {
    generateDocumentPresignedUrl,
    updateDocumentStatus,
    uploadFileToPresignUrl
} from "../../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useFormTranslation } from "../../../hooks/commonHooks";
import { GeneratePresignedUrlResponse } from "../../../model/apiModels";
import { QText } from "../../common/Fonts";
import "./UploadSignedDocumentModal.css";
import { closeModal } from "../../../reducers/commonSlice";
import { RocketIcon } from "../../icons/RocketIcon";
import { DocumentStatus } from "../../../model/commonModels";

export function UploadSignedDocumentModal() {
    const { wt } = useFormTranslation();
    const { Dragger } = Upload;
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state);
    const userId = useAppSelector(state => state.auth.userId);
    const caseId = useAppSelector(state => state.case.currentCaseId);
    const accessToken = useAppSelector((state) => state.auth.accessToken);
    const role = useAppSelector((state) => state.auth.role);

    const [confirmDisabled, setConfirmDisabled] = useState(true);
    const [documentType, setDocumentType] = useState("");
    const [loading, setLoading] = useState(false);
    const presignedUrlResRef = useRef<GeneratePresignedUrlResponse | null>(null);
    const modalData = useAppSelector((state) => state.common.modalData);
    const fileListRef = useRef<File[]>([]);

    const updateStatus = async (documentId: number, documentStatus: DocumentStatus) => {
        try {
            if (!accessToken) {
                message.error("Access token is missing");
                return;
            }
            await updateDocumentStatus(role, documentId, true, documentStatus, accessToken);
        } catch (error) {
            console.error(`Failed to update document status: ${error}`);
        }
    };

    const onPassportImageUrlReceived = (imageUrl: string) => {
        modalData?.updatePassportOrIdImageUrl(imageUrl);
    };

    const onPresignedUrlReceived = (res: GeneratePresignedUrlResponse, file: File) => {
        presignedUrlResRef.current = res;
        fileListRef.current.push(file);
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

    const onConfirmButtonClick = async () => {
        try {
            setLoading(true);
            for (const file of fileListRef.current) {
                const createdBy = role === "APPLICANT" ? "APPLICANT" : "LAWYER";
                const description = `This is an applicant signed file which is ready to be submitted.`;
                const selectedOperation = "NEW";
                if (!accessToken || !userId || !caseId) {
                    message.error("Access token, userId or caseId is missing");
                    return;
                }
                const presignedUrlResponse = await generateDocumentPresignedUrl(
                    userId,
                    parseInt(caseId),
                    "OTHER",
                    file.name,
                    "Applicant",
                    selectedOperation,
                    description,
                    createdBy,
                    accessToken,
                    role
                );

                const documentId = presignedUrlResponse.documentId;
                console.log("new documentId", documentId);

                await uploadFileToPresignUrl(
                    presignedUrlResponse.presignedUrl,
                    file,
                    onProgress,
                    () => onSuccess(file, documentId),
                    (error) => onError(error, file, documentId)
                );
            }
            setLoading(false);
            setConfirmDisabled(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleUpload = (file: File) => {
        const isPdfOrImage = file.type === "application/pdf" || file.type.startsWith("image/");
        if (!isPdfOrImage) {
            message.error(`${file.name} is not a PDF or image file.`);
            return Upload.LIST_IGNORE;
        }
        return false;
    };

    const handleFileChange = async ({ file, fileList }: any) => {
        const isPdfOrImage = file.type ? file.type === "application/pdf" || file.type.startsWith("image/") : false;
        if (isPdfOrImage) {
            const createdBy = role === "APPLICANT" ? "APPLICANT" : "LAWYER";
            const description = `This is a signed file which is ready to be submitted.`;
            const selectedOperation = "REPLACE";
            if (!accessToken || !userId || !caseId) {
                message.error("Access token, userId or caseId is missing");
                return;
            }
            try {
                const presignedUrlResponse = await generateDocumentPresignedUrl(
                    userId,
                    parseInt(caseId),
                    "SIGNED",
                    file.name,
                    "Applicant",
                    selectedOperation,
                    description,
                    createdBy,
                    accessToken,
                    role
                );
                onPresignedUrlReceived(presignedUrlResponse, file);
                setConfirmDisabled(false);
            } catch (err) {
                console.error(err);
                message.error(`Failed to get presigned URL for ${file.name}.`);
            }
        } else {
            message.error(`${file.name} is not a PDF or image file.`);
        }
    };

    const uploadProps: UploadProps = {
        beforeUpload: handleUpload,
        onChange: handleFileChange,
        multiple: true
    };

    const handleModalCancel = () => {
        dispatch(closeModal());
    };

    return (
        <div className="register-tracking-number-modal">
            <div className="modal-header">
                <QText level="large">{wt("UploadSignedDocument")}</QText>
            </div>
            <div className="modal-content">
                <div className="modal-left">
                    <RocketIcon className="rocket-icon"/>
                </div>
                <div className="modal-right">
                    <div className="form-item">
                        <div className="upload-signed-document-uploader">
                            <Dragger {...uploadProps}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined/>
                                </p>
                                <p className="ant-upload-text">{wt("Click or drag file to this area to upload")}</p>
                            </Dragger>
                        </div>
                    </div>
                    <div className="upload-signed-document-controls">
                        <Button key="Back" onClick={handleModalCancel}>
                            {wt("Return")}
                        </Button>
                        <Button
                            type="primary"
                            size="large"
                            onClick={onConfirmButtonClick}
                            disabled={confirmDisabled}
                        >
                            {loading ? <LoadingOutlined/> : wt("Confirm")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
