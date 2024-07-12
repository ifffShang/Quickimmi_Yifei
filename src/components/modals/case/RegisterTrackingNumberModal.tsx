import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, message, Upload, UploadProps } from "antd";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useFormTranslation } from "../../../hooks/commonHooks";
import { QText } from "../../common/Fonts";
import "./RegisterTrackingNumberModal.css";
import { closeModal } from "../../../reducers/commonSlice";
import { RocketIcon } from "../../icons/RocketIcon";
import { useFileUpload } from "./useFileUpload";
import { KeyValues } from "../../../model/commonModels";
import { updateCaseProgress } from "../../../utils/progressUtils";

interface RegisterTrackingNumberModalProps {
  modalData?: KeyValues;
}

export function RegisterTrackingNumberModal({ modalData }: RegisterTrackingNumberModalProps) {
  const { loading, confirmDisabled, handleUpload, handleFileChange, onConfirmButtonClick } = useFileUpload();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const caseId = useAppSelector(state => state.case.currentCaseId);
  const role = useAppSelector(state => state.auth.role);
  const { wt } = useFormTranslation();
  const { Dragger } = Upload;
  const dispatch = useAppDispatch();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [carrier, setCarrier] = useState("");

  const uploadProps: UploadProps = {
    beforeUpload: handleUpload,
    onChange: handleFileChange,
    multiple: true,
  };

  const handleModalCancel = () => {
    dispatch(closeModal());
  };

  const onUploadComplete = async (documentIds: number[]) => {
    if (!accessToken || !caseId || !modalData) {
      message.error("Access token, Case Progress Data or CaseId is missing");
      return false;
    }
    if (!trackingNumber || !carrier) {
      message.error("Tracking number or carrier is missing");
      return;
    }
    const currentSubStepMetadata = JSON.stringify({
      documentIds,
      carrier,
      trackingNumber,
    });
    const currentStep = "SUBMIT_APPLICATION";
    const currentSubStep = "SUBMIT_APPLICATION";
    const success = await updateCaseProgress(
      caseId,
      modalData.progressSteps,
      accessToken,
      role,
      currentStep,
      currentSubStep,
      currentSubStepMetadata,
    );
    if (success) {
      dispatch(closeModal());
    }
  };

  return (
    <div className="register-tracking-number-modal">
      <div className="modal-header">
        <QText level="large">{wt("UploadTrackingNumber")}</QText>
        <p className="model-desc">{wt("UploadTrackingNumberDesc")}</p>
      </div>
      <div className="modal-content">
        <div className="modal-left">
          <RocketIcon className="rocket-icon" />
        </div>
        <div className="modal-right">
          <div className="form-item">
            <div className="upload-signed-document-uploader">
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">{wt("Click or drag file to this area to upload")}</p>
              </Dragger>
            </div>
          </div>
          <div className="form-item">
            <label className="form-label">{wt("Select carrier")}</label>
            <select className="form-select" value={carrier} onChange={e => setCarrier(e.target.value)}>
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
            <input
              type="text"
              className="form-input"
              placeholder={wt("Enter tracking number")}
              value={trackingNumber}
              onChange={e => setTrackingNumber(e.target.value)}
            />
          </div>
          <div className="upload-signed-document-controls">
            <Button key="Back" onClick={handleModalCancel}>
              {wt("Return")}
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={() => onConfirmButtonClick("DELIVERY_PACKAGE_PHOTO", "Delivery Package Photo", onUploadComplete)}
              disabled={confirmDisabled}
            >
              {loading ? <LoadingOutlined /> : wt("Confirm")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
