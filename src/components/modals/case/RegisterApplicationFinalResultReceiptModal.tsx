import {InboxOutlined, LoadingOutlined} from "@ant-design/icons";
import {Button, Upload, UploadProps} from "antd";
import React from "react";
import {useAppDispatch} from "../../../app/hooks";
import {useFormTranslation} from "../../../hooks/commonHooks";
import {QText} from "../../common/Fonts";
import "./RegisterApplicationFinalResultReceiptModal.css";
import {closeModal} from "../../../reducers/commonSlice";
import {RocketIcon} from "../../icons/RocketIcon";
import {useFileUpload} from "./useFileUpload";

export function RegisterApplicationFinalResultReceiptModal() {
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
        <div className="register-application-result-modal">
            <div className="modal-header">
                <QText level="large">{wt("ApplicationResult")}</QText>
                <p className="model-desc">{wt("UploadApplicationResultDesc")}</p>
            </div>
            <div className="modal-content">
                <div className="modal-left">
                    <RocketIcon className="rocket-icon"/>
                </div>
                <div className="modal-right">
                    <div className="form-item">
                        <label className="form-label">{wt("Select result")}</label>
                        <select className="form-select">
                            <option>{wt("Select result")}</option>
                            <option value="Approved">FedEx</option>
                            <option value="Rejected">UPS</option>
                        </select>
                    </div>
                    <div className="form-item">
                        <label className="form-label">{wt("Upload Application Result Notice")}</label>
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
                            onClick={() => onConfirmButtonClick("FINAL_RESULT_RECEIPT", onUploadComplete)}
                            disabled={confirmDisabled}
                        >
                            {confirmDisabled ? (
                                loading ? (
                                    <LoadingOutlined/>
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
