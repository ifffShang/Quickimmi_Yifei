import React from "react";
import { Card, Descriptions, Tag } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { CaseSummary } from "../../../model/apiModels";
import { useTranslation } from "react-i18next";
import "./CaseStatusCard.css";
interface CaseStatusCardProps {
  caseSummary: CaseSummary;
}

const CaseStatusCard: React.FC<CaseStatusCardProps> = ({ caseSummary }) => {
  const { t } = useTranslation();
  const {
    id,
    applicantName,
    caseType,
    maritalStatus,
    applyWithSpouse,
    numberOfChildren,
    numberOfApplyingChildren,
    createdAt,
    updatedAt,
  } = caseSummary;

  return (
    <Card
      title={
        <div className="case-card-header">
          <div>
            <span style={{ fontWeight: "bold", fontSize: "16px" }}>
              {t("CaseNumber") + ":#"}
            </span>
            {id}
          </div>
          <div>
            <Tag
              color="#F2F2F2"
              style={{ marginTop: "10px", color: "#828282" }}
            >
              {t("Asylum") + "-4"}
            </Tag>
          </div>
        </div>
      }
      extra={
        <div className="case-card-header">
          <a href="#">
            <DownloadOutlined /> {t("DownloadFile")}
          </a>{" "}
          <Tag color="orange" className="draft-tag">
            {t("Draft")}
          </Tag>
        </div>
      }
      className="case-card"
    >
      <Descriptions column={3}>
        <Descriptions.Item label={t("CreatedAt")}>
          {new Date(createdAt).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label={t("LastUpdated")}>
          {new Date(updatedAt).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label={t("MasterApplicant")}>
          {applicantName}
        </Descriptions.Item>
        <Descriptions.Item label={t("MaritalStatus")}>
          {maritalStatus}
        </Descriptions.Item>
        <Descriptions.Item label={t("SpousePartnerApplication")}>
          {applyWithSpouse ? "Yes" : "No"}
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

export default CaseStatusCard;
