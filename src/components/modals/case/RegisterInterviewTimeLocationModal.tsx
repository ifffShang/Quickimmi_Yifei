import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, message, Upload, UploadProps } from "antd";
import React, { useRef, useState } from "react";
import { uploadFileToPresignUrl } from "../../../api/documentAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useFormTranslation } from "../../../hooks/commonHooks";
import { GeneratePresignedUrlResponse } from "../../../model/apiModels";
import { QText } from "../../common/Fonts";
import "./RegisterInterviewTimeLocationModal.css";
import { closeModal } from "../../../reducers/commonSlice";
import { RocketIcon } from "../../icons/RocketIcon";
import { useFileUpload } from "./useFileUpload";
import { KeyValues } from "../../../model/commonModels";
import { moveCaseProgressToNextStep } from "../../../utils/progressUtils";
interface RegisterInterviewTimeLocationModalProps {
  modalData?: KeyValues;
}
export function RegisterInterviewTimeLocationModal({ modalData }: RegisterInterviewTimeLocationModalProps) {
  const { loading, confirmDisabled, handleUpload, handleFileChange, onConfirmButtonClick } = useFileUpload();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const caseId = useAppSelector(state => state.case.currentCaseId);
  const role = useAppSelector(state => state.auth.role);
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
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
    if (!time || !location) {
      message.error("Time or location is missing");
      return;
    }
    const currentSubStepMetadata = JSON.stringify({
      documentIds,
      time,
      location,
      note,
    });
    const currentStep = "FINGERPRINT_INTERVIEW";
    const currentSubStep = modalData.substepName;
    console.log("currentSubStep", currentSubStep);
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
    <div className="register-interview-appointment-modal">
      <div className="modal-header">
        <QText level="large">{wt("UploadInterviewAppointmentInfo")}</QText>
        <p className="model-desc">{wt("UploadInterviewAppointmentInfoDesc")}</p>
      </div>
      <div className="modal-content">
        <div className="modal-left">
          <RocketIcon className="rocket-icon" />
        </div>
        <div className="modal-right">
          <div className="form-item">
            <label className="form-label">{wt("Upload Interview Receipt")}</label>
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
            <label className="form-label">{wt("Time")}</label>
            <input
              type="text"
              className="form-input"
              placeholder={wt("Time")}
              value={time}
              onChange={e => setTime(e.target.value)}
            />{" "}
          </div>
          <div className="form-item">
            <label className="form-label">{wt("Location")}</label>
            <input
              type="text"
              className="form-input"
              placeholder={wt("Location")}
              value={location}
              onChange={e => setLocation(e.target.value)}
            />{" "}
          </div>
          <div className="form-item">
            <label className="form-label">{wt("Note")}</label>
            <input
              type="text"
              className="form-input"
              placeholder={wt("Note")}
              value={note}
              onChange={e => setNote(e.target.value)}
            />{" "}
          </div>
          <div className="upload-signed-document-controls">
            <Button key="Back" onClick={handleModalCancel}>
              {wt("Return")}
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={() => onConfirmButtonClick("INTERVIEW_RECEIPT", "Interview receipt", onUploadComplete)}
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
