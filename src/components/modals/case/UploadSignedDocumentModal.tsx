import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, message, Upload, UploadProps } from "antd";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useFormTranslation } from "../../../hooks/commonHooks";
import { QText } from "../../common/Fonts";
import "./UploadSignedDocumentModal.css";
import { closeModal } from "../../../reducers/commonSlice";
import { RocketIcon } from "../../icons/RocketIcon";
import { useFileUpload } from "./useFileUpload";
import { moveCaseProgressToNextStep } from "../../../utils/progressUtils";
import { KeyValues } from "../../../model/commonModels";

interface UploadSignedDocumentModalProps {
  modalData?: KeyValues;
}

export function UploadSignedDocumentModal({ modalData }: UploadSignedDocumentModalProps) {
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
    const currentStep = "REVIEW_AND_SIGN";
    const currentSubStep = "CLIENT_SIGNATURE";
    const currentSubStepMetadata = JSON.stringify({
      documentIds,
    });
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
    <div className="register-tracking-number-modal">
      <div className="modal-header">
        <QText level="large">{wt("UploadSignedDocument")}</QText>
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
          <div className="upload-signed-document-controls">
            <Button key="Back" onClick={handleModalCancel}>
              {wt("Return")}
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={() => onConfirmButtonClick("SIGNED", "Signed Document", onUploadComplete)}
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
