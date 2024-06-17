import React from "react";
import { Card, Steps, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { CaseSummary } from "../../../model/apiModels";
import { useTranslation } from "react-i18next";
import "./CaseProgressCard.css";

interface CaseProgressCardProps {
    caseSummary: CaseSummary;
}

const { Step } = Steps;

function getCurrentStepIndex(currentStep: string, steps: { name: string }[]) {
    return steps.findIndex(step => step.name === currentStep);
}

const CaseProgressCard: React.FC<CaseProgressCardProps> = ({ caseSummary }) => {
    const { t } = useTranslation();

    const currentStepIndex = getCurrentStepIndex(caseSummary.currentStep, caseSummary.progress.steps);

    return (
        <Card title={t("CaseProgressTitle")}>
            <Steps current={currentStepIndex}>
                {caseSummary.progress.steps.map(step => (
                    <Step key={step.name} title={t(step.name)} />
                ))}
            </Steps>
            <Card style={{ marginTop: "16px", border: "none", boxShadow: "none" }}>
                <div className="progress-section">
                    <ExclamationCircleOutlined style={{ color: "#FAAD14", fontSize: "20px" }} />
                    <div className="progress-content">
                        <div className="progress-header">{t("LawyerReviewing")}</div>
                        <div className="progress-body">{t("ClientSubmittedInfo")}</div>
                        <div className="progress-actions">
                            <Button type="primary">{t("Review")}</Button>
                        </div>
                    </div>
                </div>
            </Card>
        </Card>
    );
};

export default CaseProgressCard;
