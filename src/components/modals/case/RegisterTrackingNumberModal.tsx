import {InboxOutlined, LoadingOutlined} from "@ant-design/icons";
import {Button, message, Upload, UploadProps} from "antd";
import React from "react";
import {useAppDispatch} from "../../../app/hooks";
import {useFormTranslation} from "../../../hooks/commonHooks";
import {QText} from "../../common/Fonts";
import "./RegisterTrackingNumberModal.css";
import {closeModal} from "../../../reducers/commonSlice";
import {RocketIcon} from "../../icons/RocketIcon";
import {useFileUpload} from "./useFileUpload";

export function RegisterTrackingNumberModal() {
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
                <QText level="large">{wt("UploadTrackingNumber")}</QText>
                <p className="model-desc">{wt("UploadTrackingNumberDesc")}</p>
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
                    <div className="form-item">
                        <label className="form-label">{wt("Select carrier")}</label>
                        <select className="form-select">
                            <option>{wt("Select carrier")}</option>
                            <option value="fedex">FedEx</option>
                            <option value="ups">UPS</option>
                            <option value="usps">USPS</option>
                            <option value="dhl">DHL</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-item">
                        <label className="form-label">{wt("Tracking Number")}</label>
                        <input type="text" className="form-input" placeholder={wt("Enter tracking number")}/>
                    </div>
                    <div className="upload-signed-document-controls">
                        <Button key="Back" onClick={handleModalCancel}>
                            {wt("Return")}
                        </Button>
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => onConfirmButtonClick("DELIVERY_PACKAGE_PHOTO", onUploadComplete)}
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