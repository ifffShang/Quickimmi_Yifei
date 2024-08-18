import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, message, Upload, UploadProps } from "antd";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useFormTranslation } from "../../../hooks/commonHooks";
import { QText } from "../../common/Fonts";
import "./RegisterApplicationFinalResultReceiptModal.css";
import { closeModal } from "../../../reducers/commonSlice";
import { RocketIcon } from "../../icons/RocketIcon";
import { useFileUpload } from "./useFileUpload";
import { KeyValues } from "../../../model/commonModels";
import { moveCaseProgressToNextStep } from "../../../utils/progressUtils";

interface RegisterApplicationFinalResultReceiptModalProps {
  modalData?: KeyValues;
}
export function RegisterApplicationFinalResultReceiptModal({
  modalData,
}: RegisterApplicationFinalResultReceiptModalProps) {
  const { loading, confirmDisabled, handleUpload, handleFileChange, onConfirmButtonClick } = useFileUpload();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const caseId = useAppSelector(state => state.case.currentCaseId);
  const role = useAppSelector(state => state.auth.role);
  const [result, setResult] = useState("");
  const [note, setNote] = useState("");

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
    if (!result) {
      message.error("Result is missing");
      return;
    }
    const currentSubStepMetadata = JSON.stringify({
      documentIds,
      result,
    });
    const currentStep = "FINAL_RESULT";
    const currentSubStep = "FINAL_REVIEW";
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
    <div className="register-application-result-modal">
      <div className="modal-header">
        <QText level="large">{wt("ApplicationResult")}</QText>
        <p className="model-desc">{wt("UploadApplicationResultDesc")}</p>
      </div>
      <div className="modal-content">
        <div className="modal-left">
          <RocketIcon className="rocket-icon" />
        </div>
        <div className="modal-right">
          <div className="form-item">
            <label className="form-label">{wt("Upload Application Result Notice")}</label>
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
            <label className="form-label">{wt("Select result")}</label>
            <select className="form-select" value={result} onChange={e => setResult(e.target.value)}>
              <option>{wt("Select result")}</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="form-item">
            <label className="form-label">{wt("Note")}</label>
            <input
              type="text"
              className="form-input"
              placeholder={wt("Note")}
              value={note}
              onChange={e => setNote(e.target.value)}
            />
          </div>
          <div className="upload-signed-document-controls">
            <Button key="Back" onClick={handleModalCancel}>
              {wt("Return")}
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={() => onConfirmButtonClick("FINAL_RESULT_RECEIPT", "FINAL RESULT RECEIPT", onUploadComplete)}
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
