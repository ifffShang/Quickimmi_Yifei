import React from "react";
import { Card, Descriptions, Tag } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { CaseSummary } from "../../../model/apiModels";
import { useTranslation } from "react-i18next";
import "./CaseStatusCard.css";

interface CaseStatusCardProps {
  caseSummary: CaseSummary;
}

const CaseSummaryCard: React.FC<CaseStatusCardProps> = ({ caseSummary }) => {
  const { t } = useTranslation();
  const {
    id,
    applicantName,
    caseType,
    asylumType,
    maritalStatus,
    applyWithSpouse,
    numberOfChildren,
    numberOfApplyingChildren,
    createdAt,
    updatedAt,
    currentStep,
  } = caseSummary;

  let tagColor = "orange";
  let tagText = t("Draft");

  if (currentStep === "REVIEW_AND_SIGN") {
    tagColor = "blue";
    tagText = t("Reviewing");
  } else if (
    currentStep === "SUBMIT_APPLICATION" ||
    currentStep === "FINGERPRINT_INTERVIEW" ||
    currentStep === "FINAL_RESULT"
  ) {
    tagColor = "green";
    tagText = t("Submitted");
  }

  return (
    <Card
      title={
        <div className="case-card-header">
          <div>
            <span style={{ fontWeight: "bold", fontSize: "16px" }}>
              {t("CaseNumber") + ": #"}
            </span>
            {id}
          </div>
          <div>
            <Tag
              color="#F2F2F2"
              style={{ marginTop: "10px", color: "#828282" }}
            >
              {asylumType ? `${t(caseType)} - ${t(asylumType)}` : t(caseType)}
            </Tag>
          </div>
        </div>
      }
      extra={
        <div className="case-card-header">
          {/*<a href="#">*/}
          {/*  <DownloadOutlined /> {t("DownloadFile")}*/}
          {/*</a>*/}
          <Tag color={tagColor} className="draft-tag">
            {tagText}
          </Tag>
        </div>
      }
      className="case-card"
    >
      <Descriptions column={3}>
        <Descriptions.Item label={t("CreatedAt")}>
          {new Date(createdAt).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label={t("LastUpdatedAt")}>
          {new Date(updatedAt).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label={t("MasterApplicant")}>
          {applicantName}
        </Descriptions.Item>
        <Descriptions.Item label={t("MaritalStatus")}>
          {maritalStatus}
        </Descriptions.Item>
        <Descriptions.Item label={t("SpousePartnerApplication")}>
          {applyWithSpouse ? t("Yes") : t("No")}
        </Descriptions.Item>
        <Descriptions.Item label={t("NumberOfChildren")}>
          {numberOfChildren}
        </Descriptions.Item>
        <Descriptions.Item label={t("NumberOfChildApplication")}>
          {numberOfApplyingChildren}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default CaseSummaryCard;
