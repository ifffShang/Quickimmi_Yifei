import React, { useState, useEffect } from "react";
import { Card, Button, Tooltip, Spin, message } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { getFileIcon, getFileType } from "../../../utils/fileIconUtils";
import { ModalType, openModal } from "../../../reducers/commonSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { QText } from "../../common/Fonts";
import { getDocumentByIdApi } from "../../../api/caseAPI";
import { UploadedDocument } from "../../../model/apiModels";

interface ExpandedCardProps {
  isLawyer: boolean;
  substepName: string;
  substepMetadata: { [key: string]: any } | null;
  substepStatus?: string | null;
  progressSteps?: {
    name: string;
    status: string;
    substeps: { name: string; status: string }[];
  }[];
  onCaseSummaryUpdate: () => void;
}

const CaseProgressExpandedCard: React.FC<ExpandedCardProps> = ({
  isLawyer,
  substepName,
  substepMetadata,
  substepStatus = null,
  progressSteps = null,
  onCaseSummaryUpdate,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  const accessToken = useAppSelector(state => state.auth.accessToken);
  const userRole = useAppSelector(state => state.auth.role);
  const [subStepDocument, setSubStepDocument] = useState<UploadedDocument | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      if (!accessToken || !userRole) return;
      if (substepMetadata?.documentIds) {
        try {
          const document = await getDocumentByIdApi(accessToken, substepMetadata.documentIds, userRole);
          setSubStepDocument(document);
        } catch (error) {
          console.error("Failed to fetch document:", error);
        }
      }
    };

    fetchDocument();
  }, [substepMetadata?.documentId, accessToken, userRole]);

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

  const getTooltipText = (stepStatus: string | null, currentStepStatus: string) => {
    if (stepStatus === "COMPLETED") {
      return t("stepCompletedTooltip");
    } else if (stepStatus === "NOT_START" && currentStepStatus !== "IN_PROGRESS") {
      return t("stepNotStartedTooltip");
    }
    return "";
  };

  const isButtonDisabled = (textKey: string) => {
    if (!progressSteps) return true;

    const isDownloadButton = [
      "downloadSignatureDocsButtonText",
      "downloadSignedDocsButtonText",
      "downloadSignatureDocsButtonText",
      "viewReceiptButtonText",
    ].includes(textKey);

    if (substepStatus === "IN_PROGRESS") return false;
    else if (substepStatus === "COMPLETED" && isDownloadButton) return false;
    else return true;
    // let inProgressStepFound = false;
    // for (const step of progressSteps) {
    //   for (const substep of step.substeps) {
    //     if (substep.status === "IN_PROGRESS") {
    //       inProgressStepFound = true;
    //       if (substep.name === substepName) return false;
    //     } else if (isDownloadButton && substep.status == "COMPLETED") {
    //       return false;
    //     }
    //   }
    // }
    // return !inProgressStepFound;
  };

  const renderButton = (textKey: string, onClick?: () => void) => {
    if (!progressSteps) return null;
    const buttonDisabled = isButtonDisabled(textKey);
    const tooltipText = getTooltipText(
      substepStatus,
      progressSteps.find(step => step.substeps.some(s => s.name === substepName))?.status || "",
    );

    const button = (
      <Button className="custom-button" disabled={buttonDisabled} onClick={onClick}>
        {t(textKey)}
      </Button>
    );

    return buttonDisabled ? <Tooltip title={tooltipText}>{button}</Tooltip> : button;
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
    if (!isLawyer || !accessToken || !userRole) {
      return (
        <div className="card-content">
          <p>{t("You are not a lawyer")}</p>
        </div>
      );
    }

    const handleGoCompleteLawyerReviewClick = () => {
      navigate(`/case/${id}?section=5&subsection=0`);
    };

    const handleDownloadToSignDocClick = () => {
      navigate(`/case/${id}?section=5&subsection=1`);
    };

    const handleDownloadSignedDocClick = () => {
      navigate(`/casedocuments/${id}?type=signed`);
    };

    const handleDocumentDownload = async () => {
      if (subStepDocument) {
        const response = await fetch(subStepDocument.presignUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = window.document.createElement("a");
        a.href = url;
        a.download = subStepDocument.name;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        message.error("Document not found");
      }
    };
    const handlePopUpModalClick = (modalType: ModalType, progressSteps, substepName?: string) => {
      dispatch(
        openModal({
          modalType: modalType,
          modalData: {
            progressSteps: progressSteps,
            substepName: substepName,
            onCaseSummaryUpdate, 
          },
        }),
      );
    };

    switch (substepName) {
      case "FILLING_DETAILS":
        return (
          <div className="filling-details-card-content">{substepMetadata && renderSubstepContent(substepMetadata)}</div>
        );
      case "LAWYER_REVIEW":
        return (
          <div className="card-content">
            <QText level="normal">{t("lawyerReviewMessage")}</QText>
            {renderButton("reviewButtonText", handleGoCompleteLawyerReviewClick)}
          </div>
        );
      case "CLIENT_SIGNATURE":
        return (
          <div className="card-content">
            {substepMetadata ? (
              <>
                <div className="info-group">
                  <QText level="normal">{t("clientSignaturePostMessage")}</QText>
                  <h4>Document:</h4>
                  <div className="info-doc">
                    {getFileIcon(subStepDocument?.name || "", 30)}
                    <a onClick={handleDocumentDownload}>
                      {subStepDocument ? subStepDocument.name : "Retrieving document..."}
                    </a>
                  </div>
                </div>
                <div className="button-group">
                  {renderButton("downloadSignatureDocsButtonText", handleDownloadToSignDocClick)}
                  {renderButton("updateSignedDocsButtonText", () =>
                    handlePopUpModalClick("uploadSignedDocument", progressSteps, substepName),
                  )}
                </div>
              </>
            ) : (
              <>
                <QText level="normal">{t("clientSignatureMessage")}</QText>
                <div className="button-group">
                  {renderButton("downloadSignatureDocsButtonText", handleDownloadToSignDocClick)}
                  {renderButton("uploadSignedDocsButtonText", () =>
                    handlePopUpModalClick("uploadSignedDocument", progressSteps, substepName),
                  )}
                </div>
              </>
            )}
          </div>
        );
      case "SUBMIT_APPLICATION":
        return (
          <div className="card-content">
            {substepMetadata ? (
              <>
                <div className="info-group">
                  <QText level="normal">{t("submitApplicationPostMessage")}</QText>
                  <div className="info-subinfo">
                    <h4>
                      Carrier: <span>{substepMetadata.carrier || "No carrier found"}</span>
                    </h4>
                    <h4>
                      Tracking Number: <span>{substepMetadata.trackingNumber || "No tracking number found"}</span>
                    </h4>
                  </div>
                  <h4>Document:</h4>
                  <div className="info-doc">
                    {getFileIcon(subStepDocument?.name || "", 30)}
                    <a onClick={handleDocumentDownload}>
                      {subStepDocument ? subStepDocument.name : "Retrieving document..."}
                    </a>
                  </div>
                </div>
                <div className="button-group">
                  {renderButton("downloadSignedDocsButtonText", handleDownloadSignedDocClick)}
                  {renderButton("changeTrackingInfoButtonText", () =>
                    handlePopUpModalClick("registerTrackingNumber", progressSteps, substepName),
                  )}
                </div>
              </>
            ) : (
              <>
                <QText level="normal">{t("submitApplicationMessage")}</QText>
                <div className="button-group">
                  {renderButton("registerTrackingNumberButtonText", () =>
                    handlePopUpModalClick("registerTrackingNumber", progressSteps, substepName),
                  )}
                </div>
              </>
            )}
          </div>
        );
      case "NOTICE_RECEIPT":
        return (
          <div className="card-content">
            {substepMetadata ? (
              <>
                <div className="info-group">
                  <QText level="normal">{t("noticeReceiptPostMessage")}</QText>
                  <h4>Document:</h4>
                  <div className="info-doc">
                    {getFileIcon(subStepDocument?.name || "", 30)}
                    <a onClick={handleDocumentDownload}>
                      {subStepDocument ? subStepDocument.name : "Retrieving document..."}
                    </a>
                  </div>
                </div>
                <div className="button-group">
                  {renderButton("downloadSignatureDocsButtonText", handleDocumentDownload)}
                  {renderButton("updateReceiptButtonText", () =>
                    handlePopUpModalClick("registerApplicationReceipt", progressSteps, substepName),
                  )}
                </div>
              </>
            ) : (
              <>
                <QText level="normal">{t("noticeReceiptMessage")}</QText>
                <div className="button-group">
                  {renderButton("registerReceiptButtonText", () =>
                    handlePopUpModalClick("registerApplicationReceipt", progressSteps, substepName),
                  )}
                </div>
              </>
            )}
          </div>
        );
      case "FINGERPRINT_COLLECTION":
        return (
          <div className="card-content">
            {substepMetadata ? (
              <>
                <div className="info-group">
                  <QText level="normal">{t("waitingFingerprintCollectionPostMessage")}</QText>
                  <div className="info-subinfo">
                    <h4>
                      Time: <span>{substepMetadata.time}</span>
                    </h4>
                    <h4>
                      Location: <span>{substepMetadata.location}</span>
                    </h4>
                  </div>
                  <h4>
                    Note: <span>{substepMetadata.note}</span>
                  </h4>
                  <h4>Document:</h4>
                  <div className="info-doc">
                    {getFileIcon(subStepDocument?.name || "", 30)}
                    <a onClick={handleDocumentDownload}>
                      {subStepDocument ? subStepDocument.name : "Retrieving document..."}
                    </a>
                  </div>
                </div>
                <div className="button-group">
                  {renderButton("viewReceiptButtonText")}
                  {renderButton("changeTimeLocationButtonText", () =>
                    handlePopUpModalClick("registerFingerprintTimeLocation", progressSteps, substepName),
                  )}
                </div>
              </>
            ) : (
              <>
                <QText level="normal">{t("waitingFingerprintCollectionMessage")}</QText>
                {renderButton("registerFingerprintTimeLocationButtonText", () =>
                  handlePopUpModalClick("registerFingerprintTimeLocation", progressSteps, substepName),
                )}
              </>
            )}
          </div>
        );

      // case "INTERVIEW":

      case "MASTER_CALENDAR_HEARING":
        return (
          <div className="card-content">
            {substepMetadata ? (
              <>
                <div className="info-group">
                  <QText level="normal">{t("waitingInterviewPostMessage")}</QText>
                  <div className="info-subinfo">
                    <h4>
                      Time: <span>{substepMetadata.time}</span>
                    </h4>
                    <h4>
                      Location: <span>{substepMetadata.location}</span>
                    </h4>
                  </div>
                  <h4>
                    Note: <span>{substepMetadata.note}</span>
                  </h4>
                  <h4>Document:</h4>
                  <div className="info-doc">
                    {getFileIcon(subStepDocument?.name || "", 30)}
                    <a onClick={handleDocumentDownload}>
                      {subStepDocument ? subStepDocument.name : "Retrieving document..."}
                    </a>
                  </div>
                </div>
                <div className="button-group">
                  {renderButton("viewReceiptButtonText")}
                  {renderButton("changeTimeLocationButtonText", () =>
                    handlePopUpModalClick("registerInterviewTimeLocation", progressSteps, substepName),
                  )}
                </div>
              </>
            ) : (
              <>
                <QText level="normal">{t("waitingInterviewMessage")}</QText>
                {renderButton("registerInterviewTimeLocationButtonText", () =>
                  handlePopUpModalClick("registerInterviewTimeLocation", progressSteps, substepName),
                )}
              </>
            )}
          </div>
        );

      case "INDIVIDUAL_HEARING":
        return (
          <div className="card-content">
            {substepMetadata ? (
              <>
                <div className="info-group">
                  <QText level="normal">{t("waitingInterviewPostMessage")}</QText>
                  <div className="info-subinfo">
                    <h4>
                      Time: <span>{substepMetadata.time}</span>
                    </h4>
                    <h4>
                      Location: <span>{substepMetadata.location}</span>
                    </h4>
                    <h4>
                      Note: <span>{substepMetadata.note}</span>
                    </h4>
                  </div>
                  <h4>Document:</h4>
                  <div className="info-doc">
                    {getFileIcon(subStepDocument?.name || "", 30)}
                    <a onClick={handleDocumentDownload}>
                      {subStepDocument ? subStepDocument.name : "Retrieving document..."}
                    </a>
                  </div>
                </div>
                <div className="button-group">
                  {renderButton("viewReceiptButtonText")}
                  {renderButton("changeTimeLocationButtonText", () =>
                    handlePopUpModalClick("registerInterviewTimeLocation", progressSteps, substepName),
                  )}
                </div>
              </>
            ) : (
              <>
                <p>{t("waitingInterviewMessage")}</p>
                {renderButton("registerInterviewTimeLocationButtonText", () =>
                  handlePopUpModalClick("registerInterviewTimeLocation", progressSteps, substepName),
                )}
              </>
            )}
          </div>
        );
      case "FINAL_REVIEW":
        return (
          <div className="card-content">
            {substepMetadata ? (
              <>
                <div className="info-group">
                  <QText level="normal">{t("finalReviewPostMessage")}</QText>
                  <h4>Document:</h4>
                  <div className="info-doc">
                    {getFileIcon(subStepDocument?.name || "", 30)}
                    <a onClick={handleDocumentDownload}>
                      {subStepDocument ? subStepDocument.name : "Retrieving document..."}
                    </a>
                  </div>
                </div>
                <div className="button-group">
                  {renderButton("viewReceiptButtonText")}
                  {renderButton("registerReceiptButtonText", () =>
                    handlePopUpModalClick("registerApplicationFinalResultReceipt", progressSteps, substepName),
                  )}
                </div>
              </>
            ) : (
              <>
                <QText level="normal">{t("finalReviewMessage")}</QText>
                {renderButton("registerReceiptButtonText", () =>
                  handlePopUpModalClick("registerApplicationFinalResultReceipt", progressSteps, substepName),
                )}
              </>
            )}
          </div>
        );
      case "RESULT":
        return (
          <div className="card-content">
            <QText level="normal">{t("resultMessage")}</QText>
          </div>
        );
      default:
        return null;
    }
  };

  return <Card className="custom-card">{renderContent()}</Card>;
};

export default CaseProgressExpandedCard;
