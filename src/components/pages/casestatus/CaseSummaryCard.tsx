import React from "react";
import { Card, Descriptions, Tag } from "antd";
import { CaseSummary } from "../../../model/apiModels";
import { getCaseStatusAndColor } from "../../../utils/caseStatusUtils";
import { useTranslation } from "react-i18next";
import { QText } from "../../common/Fonts";
import "./CaseSummaryCard.css";

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

  const { status, color, backgroundColor, width } = getCaseStatusAndColor(currentStep);

  return (
    <Card
      title={
        <div className="case-card-header">
          <QText level="large">{t("CaseNumber") + " #" + id}</QText>
        </div>
      }
      extra={
        <p className="overview-status" style={{ color, backgroundColor, width }}>
          {t(status)}
        </p>
      }
      className="case-card"
    >
      <Descriptions className="case-card-descriptions" column={3}>
        <Descriptions.Item label={t("CreatedAt")}>
          {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label={t("LastUpdatedAt")}>
          {updatedAt ? new Date(updatedAt).toLocaleDateString() : "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label={t("MasterApplicant")}>{applicantName}</Descriptions.Item>
        <Descriptions.Item label={t("MaritalStatus")}>{maritalStatus}</Descriptions.Item>
        <Descriptions.Item label={t("SpousePartnerApplication")}>
          {applyWithSpouse !== null ? (applyWithSpouse ? t("Yes") : t("No")) : "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label={t("NumberOfChildren")}>{numberOfChildren}</Descriptions.Item>
        <Descriptions.Item label={t("NumberOfChildApplication")}>{numberOfApplyingChildren}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default CaseSummaryCard;
