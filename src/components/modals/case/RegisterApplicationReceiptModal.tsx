import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Upload, UploadProps } from "antd";
import React, { useRef, useState } from "react";
import { uploadFileToPresignUrl } from "../../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useFormTranslation } from "../../../hooks/commonHooks";
import { GeneratePresignedUrlResponse } from "../../../model/apiModels";
import { QText } from "../../common/Fonts";
import "./RegisterApplicationReceiptModal.css";
import { closeModal } from "../../../reducers/commonSlice";
import { RocketIcon } from "../../icons/RocketIcon";

export function RegisterApplicationReceiptModal() {
    const { wt } = useFormTranslation();
    const { Dragger } = Upload;
    const dispatch = useAppDispatch();
    const accessToken = useAppSelector((state) => state.auth.accessToken);
    const role = useAppSelector((state) => state.auth.role);

    const [confirmDisabled, setConfirmDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const presignedUrlResRef = useRef<GeneratePresignedUrlResponse | null>(null);
    const modalData = useAppSelector((state) => state.common.modalData);
    const fileRef = useRef<File | null>(null);

    const onPassportImageUrlReceived = (imageUrl: string) => {
        modalData?.updatePassportOrIdImageUrl(imageUrl);
    };

    const onPresignedUrlReceived = (res: GeneratePresignedUrlResponse, file: any) => {
        setConfirmDisabled(false);
        presignedUrlResRef.current = res;
        fileRef.current = file;
    };

    const onProgress = (percent: number) => {
        console.log(percent);
    };

    const onSuccess = () => {
        if (!presignedUrlResRef.current || !presignedUrlResRef.current.documentId) {
            console.error("Document ID is missing");
            return;
        }
    };

    const onError = (error: Error) => {
        setLoading(false);
        setConfirmDisabled(true);
        console.error(error);
    };

    const onConfirmButtonClick = () => {
        try {
            if (!presignedUrlResRef.current || !presignedUrlResRef.current.presignedUrl || !fileRef.current) {
                throw new Error("Presigned URL or file is missing");
            }
            setConfirmDisabled(true);
            setLoading(true);
            uploadFileToPresignUrl(
                presignedUrlResRef.current.presignedUrl,
                fileRef.current,
                onProgress,
                onSuccess,
                onError
            );
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpload = async (fileList: any) => {
        console.log("handle upload");
    };

    const uploadProps: UploadProps = {
        customRequest: handleUpload,
        multiple: false,
        maxCount: 1,
        onChange(info: any) {
            // Handle file change event
        },
        onDrop(info: any) {
            console.log("Dropped files", info.dataTransfer.files);
        },
    };

    const handleModalCancel = () => {
        dispatch(closeModal());
    };

    return (
        <div className="register-application-receipt-modal">
            <div className="modal-header">
                <QText level="large">{wt("RegisterApplicationReceipt")}</QText>
                <p className="model-desc">{wt("RegisterApplicationReceiptDesc")}</p>
            </div>
            <div className="modal-content">
                <div className="modal-left">
                    <RocketIcon className="rocket-icon" />
                </div>
                <div className="modal-right">
                    <div className="form-item">
                        <label className="form-label">{wt("Application Receipt")}</label>
                        <div className="upload-signed-document-uploader">
                            <Dragger {...uploadProps}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
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
                            {confirmDisabled ? (
                                loading ? (
                                    <LoadingOutlined />
                                ) : (
                                    wt("Confirm")
                                )
                            ) : (
                                wt("Confirm")
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
