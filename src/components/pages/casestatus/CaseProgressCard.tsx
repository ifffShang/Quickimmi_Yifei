import React from "react";
import { Card, Steps, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { CaseSummary } from "../../../model/apiModels";
import "./CaseProgressCard.css";

interface CaseProgressCardProps {
  caseSummary: CaseSummary;
}

const { Step } = Steps;

function getCurrentStepIndex(currentStep: string) {
  switch (currentStep) {
    case "信息完整":
      return 0;
    case "审核签署":
      return 1;
    case "递交申请":
      return 2;
    case "指纹面谈":
      return 3;
    case "出具结果":
      return 4;
    default:
      return 0;
  }
}

const CaseProgressCard: React.FC<CaseProgressCardProps> = ({ caseSummary }) => {
  return (
    <Card title={`案件进展`}>
      <Steps current={getCurrentStepIndex(caseSummary.currentStep)}>
        <Step title="信息完整" />
        <Step title="审核签署" />
        <Step title="递交申请" />
        <Step title="指纹面谈" />
        <Step title="出具结果" />
      </Steps>
      <Card style={{ marginTop: "16px", border: "none", boxShadow: "none" }}>
        <div className="progress-section">
          <ExclamationCircleOutlined
            style={{ color: "#FAAD14", fontSize: "20px" }}
          />
          <div className="progress-content">
            <div className="progress-header">律师审核中</div>
            <div className="progress-body">客户已提交信息，请尽快审核</div>
            <div className="progress-actions">
              <Button type="primary">审查</Button>
            </div>
          </div>
        </div>
      </Card>
    </Card>
  );
};

export default CaseProgressCard;
