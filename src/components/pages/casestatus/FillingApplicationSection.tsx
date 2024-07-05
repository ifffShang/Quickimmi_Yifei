import React from "react";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";
import CaseProgressExpandedCard from "./CaseProgressExpandedCard";
import { useParams, useNavigate } from "react-router-dom";

interface FillingApplicationSectionProps {
  currentStepDetails: any;
  expandedStep: string | null;
  handleToggleExpand: (stepName: string) => void;
  isLawyer: boolean;
  t: any;
}

const FillingApplicationSection: React.FC<FillingApplicationSectionProps> = ({
  currentStepDetails,
  expandedStep,
  handleToggleExpand,
  isLawyer,
  t,
}) => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const fillingDetailsSubstep = currentStepDetails?.substeps.find(
    (substep: any) => substep.name === "FILLING_DETAILS",
  );

  let metadata;
  if (fillingDetailsSubstep && fillingDetailsSubstep.metadata) {
    metadata = JSON.parse(fillingDetailsSubstep.metadata);
  }

  const metadataFields = [
    {
      field: "personal_information",
      title: "PersonalInformation",
      sectionIndex: 0,
    },
    {
      field: "family_information",
      title: "FamilyInformation",
      sectionIndex: 1,
    },
    {
      field: "background_information",
      title: "BackgroundInformation",
      sectionIndex: 2,
    },
    {
      field: "application_information",
      title: "ApplicationInformation",
      sectionIndex: 3,
    },
  ];

  const renderIconForFillingApplication = (percentage: number) => {
    return percentage === 100 ? (
      <CheckCircleOutlined style={{ color: "#52C41A", fontSize: "20px" }} />
    ) : (
      <ExclamationCircleOutlined
        style={{ color: "#fa8c16", fontSize: "20px" }}
      />
    );
  };

  const renderPercentageTag = (percentage: number) => (
    <Tag className="custom-percentage-tag" style={{ color: "#828282" }}>
      {`${percentage}%`}
    </Tag>
  );

  const handleGoCompleteClick = (sectionIndex: number) => {
    navigate(`/case/${id}?section=${sectionIndex}&subsection=0`);
  };

  const renderProgressItem = (
    title: string,
    percentage: number,
    stepName: string,
    sectionIndex: number,
  ) => (
    <div className="progress-item" key={stepName}>
      <div className="progress-item-content">
        <div className="icon-container">
          {renderIconForFillingApplication(percentage)}
        </div>
        <span className="progress-title">
          {t(title)}
          {renderPercentageTag(percentage)}
        </span>
      </div>
      <div className="progress-item-actions">
        {percentage < 100 && (
          <span
            className="go-complete"
            onClick={() => handleGoCompleteClick(sectionIndex)}
          >
            {t("Go Complete")}
          </span>
        )}
        <span
          className="expand-icon"
          onClick={() => handleToggleExpand(stepName)}
        >
          {expandedStep === stepName ? (
            <UpOutlined style={{ color: "black" }} />
          ) : (
            <DownOutlined style={{ color: "black" }} />
          )}
        </span>
      </div>
    </div>
  );

  return (
    <div className="progress-section">
      <h2>{t("fillingDetailsMessage")}:</h2>
      {metadata && (
        <>
          {metadataFields.map(({ field, title, sectionIndex }, index) => (
            <React.Fragment key={field}>
              {renderProgressItem(
                title,
                metadata.percentage[field].avg,
                field.toUpperCase(),
                sectionIndex,
              )}
              {expandedStep === field.toUpperCase() && (
                <div className="expanded-card-container">
                  <div className="progress-line extended-line"></div>
                  <div className="expanded-card">
                    <CaseProgressExpandedCard
                      isLawyer={isLawyer}
                      substepName={"FILLING_DETAILS"}
                      substepMetadata={metadata.percentage[field]}
                    />
                  </div>
                </div>
              )}
              {index < metadataFields.length - 1 && (
                <div className="expanded-card-container">
                  <div className="progress-line"></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
};

export default FillingApplicationSection;
