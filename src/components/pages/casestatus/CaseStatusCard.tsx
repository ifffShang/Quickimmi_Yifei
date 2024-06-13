import React from "react";
import { Card, Descriptions, Tag } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { CaseSummary } from "../../../model/apiModels";
import "./CaseStatusCard.css";
interface CaseStatusCardProps {
  caseSummary: CaseSummary;
}

const CaseStatusCard: React.FC<CaseStatusCardProps> = ({ caseSummary }) => {
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
        <>
          <div>
            <span style={{ fontWeight: "bold", fontSize: "16px" }}>
              案件编号：#
            </span>
            {id}
          </div>
          <div>
            <Tag
              color="#F2F2F2"
              style={{ marginTop: "10px", color: "#828282" }}
            >
              庇护-4
            </Tag>
          </div>
        </>
      }
      extra={
        <>
          <a href="#">
            <DownloadOutlined /> 下载文件
          </a>{" "}
          <Tag color="orange" className="draft-tag">
            草稿
          </Tag>
        </>
      }
      className="case-card"
    >
      <Descriptions column={3}>
        <Descriptions.Item label="创建时间">
          {new Date(createdAt).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="最新操作时间">
          {new Date(updatedAt).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="主要申请人">
          {applicantName}
        </Descriptions.Item>
        <Descriptions.Item label="婚姻状态">{maritalStatus}</Descriptions.Item>
        <Descriptions.Item label="配偶伴侣申请">
          {applyWithSpouse ? "是" : "否"}
        </Descriptions.Item>
        <Descriptions.Item label="子女数量">
          {numberOfChildren}
        </Descriptions.Item>
        <Descriptions.Item label="子女申请数量">
          {numberOfApplyingChildren}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default CaseStatusCard;
