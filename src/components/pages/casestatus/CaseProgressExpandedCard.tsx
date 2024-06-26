import React from "react";
import { Card, Button, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import "./CaseProgressExpandedCard.css";

interface ExpandedCardProps {
  isLawyer: boolean;
  currentStep: string;
  substepName: string;
  substepMetadata: string | null;
  substepStatus: string;
  progressSteps: {
    name: string;
    status: string;
    substeps: { name: string; status: string }[];
  }[];
}

const CaseProgressExpandedCard: React.FC<ExpandedCardProps> = ({
  isLawyer,
  currentStep,
  substepName,
  substepMetadata,
  substepStatus,
  progressSteps,
}) => {
  const { t } = useTranslation();

  const getTooltipText = (stepStatus: string, currentStepStatus: string) => {
    if (stepStatus === "COMPLETED") {
      return t("stepCompletedTooltip");
    } else if (
      stepStatus === "NOT_START" &&
      currentStepStatus !== "IN_PROGRESS"
    ) {
      return t("stepNotStartedTooltip");
    }
    return "";
  };

  const isButtonDisabled = () => {
    let inProgressStepFound = false;
    for (const step of progressSteps) {
      for (const substep of step.substeps) {
        if (substep.status === "IN_PROGRESS") {
          inProgressStepFound = true;
          if (substep.name === substepName) {
            return false;
          }
        } else if (substep.name === substepName) {
          return true;
        }
      }
    }
    return !inProgressStepFound;
  };

  const renderButton = (textKey: string) => {
    const buttonDisabled = isButtonDisabled();
    const tooltipText = getTooltipText(
      substepStatus,
      progressSteps.find(step =>
        step.substeps.some(s => s.name === substepName),
      )?.status || "",
    );

    const button = (
      <Button className="custom-button" disabled={buttonDisabled}>
        {t(textKey)}
      </Button>
    );

    return buttonDisabled ? (
      <Tooltip title={tooltipText}>{button}</Tooltip>
    ) : (
      button
    );
  };

  const renderContent = () => {
    if (!isLawyer) {
      return (
        <div className="card-content">
          <p>{t("You are not a lawyer")}</p>
          <p>{`Step: ${currentStep}`}</p>
          <p>{`Substep: ${substepName}`}</p>
        </div>
      );
    }

    switch (substepName) {
      case "FILLING_DETAILS":
        return (
          <div className="card-content">
            <p>{t("fillingDetailsMessage")}</p>
            {renderButton("fillButtonText")}
          </div>
        );
      case "LAWYER_REVIEW":
        return (
          <div className="card-content">
            <p>{t("lawyerReviewMessage")}</p>
            {renderButton("reviewButtonText")}
          </div>
        );
      case "CLIENT_SIGNATURE":
        return (
          <div className="card-content">
            <p>{t("clientSignatureMessage")}</p>
            <div className="button-group">
              {renderButton("downloadSignatureDocsButtonText")}
              {renderButton("uploadSignedDocsButtonText")}
            </div>
          </div>
        );
      case "SUBMIT_APPLICATION":
        return (
          <div className="card-content">
            <p>{t("submitApplicationMessage")}</p>
            <div className="button-group">
              {renderButton("downloadSignedDocsButtonText")}
              {renderButton("registerTrackingNumberButtonText")}
            </div>
          </div>
        );
      case "NOTICE_RECEIPT":
        return (
          <div className="card-content">
            <p>{t("noticeReceiptMessage")}</p>
            {renderButton("registerReceiptButtonText")}
          </div>
        );
      case "FINGERPRINT_COLLECTION":
        return (
          <div className="card-content">
            {substepMetadata ? (
              <>
                <p>
                  {t("fingerprintCollectionMessage", {
                    time: "14:00 02/12/2024",
                    location:
                      "room 201, 4F, 4114, Sepulveda Blvd.CulverCity,CA",
                    note: "Please bring your passport.",
                  })}
                </p>
                <div className="button-group">
                  {renderButton("viewReceiptButtonText")}
                  {renderButton("changeTimeLocationButtonText")}
                </div>
              </>
            ) : (
              <>
                <p>{t("waitingFingerprintCollectionMessage")}</p>
                {renderButton("registerFingerprintTimeLocationButtonText")}
              </>
            )}
          </div>
        );
      case "INTERVIEW":
      case "MASTER_CALENDAR_HEARING":
      case "INDIVIDUAL_HEARING":
        return (
          <div className="card-content">
            {substepMetadata ? (
              <>
                <p>
                  {t("interviewMessage", {
                    time: "14:00 02/12/2024",
                    location:
                      "room 201, 4F, 4114, Sepulveda Blvd.CulverCity,CA",
                    note: "Please bring your passport.",
                  })}
                </p>
                <div className="button-group">
                  {renderButton("viewReceiptButtonText")}
                  {renderButton("changeTimeLocationButtonText")}
                </div>
              </>
            ) : (
              <>
                <p>{t("waitingInterviewMessage")}</p>
                {renderButton("registerInterviewTimeLocationButtonText")}
              </>
            )}
          </div>
        );
      case "FINAL_REVIEW":
        return (
          <div className="card-content">
            <p>{t("finalReviewMessage")}</p>
            {renderButton("registerReceiptButtonText")}
          </div>
        );
      case "RESULT":
        return (
          <div className="card-content">
            <p>{t("resultMessage")}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return <Card className="custom-card">{renderContent()}</Card>;
};

export default CaseProgressExpandedCard;
