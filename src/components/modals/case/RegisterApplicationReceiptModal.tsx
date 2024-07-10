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
import {useFileUpload} from "./useFileUpload";

export function RegisterApplicationReceiptModal() {
    const {loading, confirmDisabled, handleUpload, handleFileChange, onConfirmButtonClick} = useFileUpload();

    const {wt} = useFormTranslation();
    const {Dragger} = Upload;
    const dispatch = useAppDispatch();

    const uploadProps: UploadProps = {
        beforeUpload: handleUpload,
        onChange: handleFileChange,
        multiple: true
    };

    const handleModalCancel = () => {
        dispatch(closeModal());
    };

    const onUploadComplete = () => {
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
                            onClick={() => onConfirmButtonClick("APPLICATION_RECEIPT", onUploadComplete)}
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
