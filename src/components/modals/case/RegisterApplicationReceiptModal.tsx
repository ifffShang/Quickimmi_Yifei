import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, message, Upload, UploadProps } from "antd";
import React, { useRef, useState } from "react";
import { uploadFileToPresignUrl } from "../../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useFormTranslation } from "../../../hooks/commonHooks";
import { GeneratePresignedUrlResponse } from "../../../model/apiModels";
import { QText } from "../../common/Fonts";
import "./RegisterApplicationReceiptModal.css";
import { closeModal } from "../../../reducers/commonSlice";
import { RocketIcon } from "../../icons/RocketIcon";
import { useFileUpload } from "./useFileUpload";
import { KeyValues } from "../../../model/commonModels";
import { moveCaseProgressToNextStep } from "../../../utils/progressUtils";

interface RegisterApplicationReceiptModalProps {
  modalData?: KeyValues;
}

export function RegisterApplicationReceiptModal({ modalData }: RegisterApplicationReceiptModalProps) {
  const { loading, confirmDisabled, handleUpload, handleFileChange, onConfirmButtonClick } = useFileUpload();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const caseId = useAppSelector(state => state.case.currentCaseId);
  const role = useAppSelector(state => state.auth.role);
  const { wt } = useFormTranslation();
  const { Dragger } = Upload;
  const dispatch = useAppDispatch();

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
      message.error("Access token, Case Progress Data or  CaseId is missing");
      return false;
    }
    const currentSubStepMetadata = JSON.stringify({
      documentIds,
    });
    const currentStep = "SUBMIT_APPLICATION";
    const currentSubStep = "NOTICE_RECEIPT";
    const success = await moveCaseProgressToNextStep(
      caseId,
      modalData.progressSteps,
      accessToken,
      role,
      currentStep,
      currentSubStep,
      currentSubStepMetadata,
    );
    if (success) {
      if (modalData.onCaseSummaryUpdate) {
        modalData.onCaseSummaryUpdate();
      }
      dispatch(closeModal());
    }
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
              onClick={() => onConfirmButtonClick("APPLICATION_RECEIPT", "APPLICATION RECEIPT", onUploadComplete)}
              disabled={confirmDisabled}
            >
              {confirmDisabled ? loading ? <LoadingOutlined /> : wt("Confirm") : wt("Confirm")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
