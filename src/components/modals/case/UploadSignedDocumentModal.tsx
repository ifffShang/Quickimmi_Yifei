import {InboxOutlined, LoadingOutlined} from "@ant-design/icons";
import {Button, message, Upload, UploadProps} from "antd";
import React from "react";
import {useAppDispatch} from "../../../app/hooks";
import {useFormTranslation} from "../../../hooks/commonHooks";
import {QText} from "../../common/Fonts";
import "./UploadSignedDocumentModal.css";
import {closeModal} from "../../../reducers/commonSlice";
import {RocketIcon} from "../../icons/RocketIcon";
import {useFileUpload} from "./useFileUpload"

export function UploadSignedDocumentModal() {
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
                            onClick={() => onConfirmButtonClick("SIGNED", onUploadComplete)}
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
