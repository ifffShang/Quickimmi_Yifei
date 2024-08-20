import React from "react";
import { CheckCircleOutlined, DownOutlined, ExclamationCircleOutlined, UpOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import CaseProgressExpandedCard from "./CaseProgressExpandedCard";
import { useNavigate, useParams } from "react-router-dom";

interface FillingApplicationSectionProps {
  currentStepDetails: any;
  expandedStep: string | null;
  handleToggleExpand: (stepName: string) => void;
  isLawyer: boolean;
  t: any;
  onCaseSummaryUpdate: () => void;
}

const FillingApplicationSection: React.FC<FillingApplicationSectionProps> = ({
  currentStepDetails,
  expandedStep,
  handleToggleExpand,
  isLawyer,
  t,
  onCaseSummaryUpdate,
}) => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const fillingDetailsSubstep = currentStepDetails?.substeps.find((substep: any) => substep.name === "FILLING_DETAILS");

  let metadata;
  if (fillingDetailsSubstep && fillingDetailsSubstep.metadata) {
    metadata = JSON.parse(fillingDetailsSubstep.metadata);
  } else {
    metadata = {
      percentage: {
        overall: {
          avg: 0,
        },
        personal_information: {
          avg: 0,
          i589_fields_basic_information: 0,
          i589_fields_contact_information: 0,
          i589_fields_immigration_information: 0,
        },
        family_information: {
          avg: 0,
          i589_fields_spouse_information: 0,
          i589_fields_children_information: 0,
          i589_fields_parents_information: 0,
          i589_fields_siblings_information: 0,
        },
        background_information: {
          avg: 0,
          i589_fields_address_before_usa: 0,
          i589_fields_address_past_5y: 0,
          i589_fields_education_information: 0,
          i589_fields_employment_information: 0,
        },
        application_information: {
          avg: 0,
          i589_fields_asylum_claim: 0,
        },
        personal_statement: {
          avg: 0,
          i589_fields_personal_statement: 0,
        },
      },
    };
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
    {
      field: "personal_statement",
      title: "PersonalStatement",
      sectionIndex: 4,
    },
  ];

  const renderIconForFillingApplication = (percentage: number) => {
    return percentage === 100 ? (
      <CheckCircleOutlined style={{ color: "#52C41A", fontSize: "20px" }} />
    ) : (
      <ExclamationCircleOutlined style={{ color: "#fa8c16", fontSize: "20px" }} />
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

  const renderProgressItem = (title: string, percentage: number, stepName: string, sectionIndex: number) => (
    <div className="progress-item" key={stepName}>
      <div className="progress-item-content">
        <div className="icon-container">{renderIconForFillingApplication(percentage)}</div>
        <span className="progress-title">
          {t(title)}
          {renderPercentageTag(percentage)}
        </span>
      </div>
      <div className="progress-item-actions">
        {percentage < 100 && (
          <span className="go-complete" onClick={() => handleGoCompleteClick(sectionIndex)}>
            {t("Go Complete")}
          </span>
        )}
        <span className="expand-icon" onClick={() => handleToggleExpand(stepName)}>
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
              {renderProgressItem(title, metadata.percentage[field].avg, field.toUpperCase(), sectionIndex)}
              {expandedStep === field.toUpperCase() && (
                <div className="expanded-card-container">
                  <div className="progress-line extended-line"></div>
                  <div className="expanded-card">
                    <CaseProgressExpandedCard
                      isLawyer={isLawyer}
                      substepName={"FILLING_DETAILS"}
                      substepMetadata={metadata.percentage[field]}
                      onCaseSummaryUpdate={onCaseSummaryUpdate}
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
