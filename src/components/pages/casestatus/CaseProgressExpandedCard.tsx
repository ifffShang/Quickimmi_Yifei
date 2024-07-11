import React from "react";
import { Card, Button, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {ModalType, openModal} from "../../../reducers/commonSlice";
import {useAppDispatch} from "../../../app/hooks";

interface ExpandedCardProps {
  isLawyer: boolean;
  substepName: string;
  substepMetadata: { [key: string]: number } | null;
  substepStatus?: string | null;
  progressSteps?: {
    name: string;
    status: string;
    substeps: { name: string; status: string }[];
  }[];
}

const CaseProgressExpandedCard: React.FC<ExpandedCardProps> = ({
  isLawyer,
  substepName,
  substepMetadata,
  substepStatus = null,
  progressSteps = null,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const translationsMap: { [key: string]: string } = {
    i589_fields_basic_information: "BasicInformation",
    i589_fields_contact_information: "ContactInformation",
    i589_fields_immigration_information: "ImmigrationInformation",
    i589_fields_spouse_information: "SpouseInformation",
    i589_fields_children_information: "ChildrenInformation",
    i589_fields_parents_information: "ParentsInformation",
    i589_fields_siblings_information: "SiblingsInformation",
    i589_fields_address_before_usa: "AddressInformationI",
    i589_fields_address_past_5y: "AddressInformationII",
    i589_fields_education_information: "EducationInformation",
    i589_fields_employment_information: "EmploymentInformation",
    i589_fields_asylum_claim: "AsylumClaim",
  };
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  const getTooltipText = (
    stepStatus: string | null,
    currentStepStatus: string,
  ) => {
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
    if (!progressSteps) return true;
    let inProgressStepFound = false;
    for (const step of progressSteps) {
      for (const substep of step.substeps) {
        if (substep.status === "IN_PROGRESS") {
          inProgressStepFound = true;
          if (substep.name === substepName) return false;
        } else if (substep.name === substepName) return true;
      }
    }
    return !inProgressStepFound;
  };

  const renderButton = (textKey: string, onClick?: () => void) => {
    if (!progressSteps) return null;
    // const buttonDisabled = isButtonDisabled();
    const buttonDisabled = false;
    const tooltipText = getTooltipText(
      substepStatus,
      progressSteps.find(step =>
        step.substeps.some(s => s.name === substepName),
      )?.status || "",
    );

    const button = (
      <Button
        className="custom-button"
        disabled={buttonDisabled}
        onClick={onClick}
      >
        {t(textKey)}
      </Button>
    );

    return buttonDisabled ? (
      <Tooltip title={tooltipText}>{button}</Tooltip>
    ) : (
      button
    );
  };

  const renderSubstepContent = (metadata: { [key: string]: number }) => {
    const content: JSX.Element[] = [];
    for (const [key, value] of Object.entries(metadata)) {
      if (key !== "avg") {
        const translationKey = translationsMap[key] || key;
        const valueColor = value === 100 ? "#27ae60" : "#FF9900";
        content.push(
            <div key={translationKey} className="metadata-item">
              <span className="metadata-key">{t(translationKey)}</span>
              <span className="metadata-value" style={{ color: valueColor }}>{`${value}%`}</span>
            </div>,
        );
      }
    }
    return content;
  };


  const renderContent = () => {
    if (!isLawyer) {
      return (
        <div className="card-content">
          <p>{t("You are not a lawyer")}</p>
        </div>
      );
    }
    const handleGoCompleteLawyerReviewClick = () => {
      navigate(`/case/${id}?section=4&subsection=0`);
    };

    const handleDownloadToSignDocClick = () => {
      // navigate(`/case/${id}?section=5&subsection=0`);
      navigate(`/casedocuments/${id}?type=merged`);
    };

    const handleDownloadSignedDocClick = () => {
      navigate(`/casedocuments/${id}?type=signed`);
    };

    const handlePopUpModalClick = (modalType: ModalType, progressSteps) => {
      dispatch(
          openModal({
            modalType: modalType,
            modalData: {
              progressSteps: progressSteps
            },
          }),
      );
    };

    switch (substepName) {
      case "FILLING_DETAILS":
        return (
            <div className="filling-details-card-content">
              {substepMetadata && renderSubstepContent(substepMetadata)}
            </div>
        );
      case "LAWYER_REVIEW":
        return (
          <div className="card-content">
            <p>{t("lawyerReviewMessage")}</p>
            {renderButton("reviewButtonText", handleGoCompleteLawyerReviewClick)}
          </div>
        );
      case "CLIENT_SIGNATURE":
        return (
          <div className="card-content">
            <p>{t("clientSignatureMessage")}</p>
            <div className="button-group">
              {renderButton("downloadSignatureDocsButtonText", handleDownloadToSignDocClick)}
              {renderButton("uploadSignedDocsButtonText",
                  () => handlePopUpModalClick("uploadSignedDocument", progressSteps))}
            </div>
          </div>
        );
      case "SUBMIT_APPLICATION":
        return (
          <div className="card-content">
            <p>{t("submitApplicationMessage")}</p>
            <div className="button-group">
              {renderButton("downloadSignedDocsButtonText", handleDownloadSignedDocClick)}
              {renderButton("registerTrackingNumberButtonText",
                  () => handlePopUpModalClick("registerTrackingNumber", progressSteps))}
            </div>
          </div>
        );
      case "NOTICE_RECEIPT":
        return (
          <div className="card-content">
            <p>{t("noticeReceiptMessage")}</p>
            {renderButton("registerReceiptButtonText",
                () => handlePopUpModalClick("registerApplicationReceipt", progressSteps))}
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
                {renderButton("registerFingerprintTimeLocationButtonText",
                    () => handlePopUpModalClick("registerFingerprintTimeLocation", progressSteps))}
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
                {renderButton("registerInterviewTimeLocationButtonText",
                    () => handlePopUpModalClick("registerInterviewTimeLocation", progressSteps))}
              </>
            )}
          </div>
        );
      case "FINAL_REVIEW":
        return (
          <div className="card-content">
            <p>{t("finalReviewMessage")}</p>
            {renderButton("registerReceiptButtonText",
                () => handlePopUpModalClick("registerApplicationFinalResultReceipt", progressSteps))}
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
