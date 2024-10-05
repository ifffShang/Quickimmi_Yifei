import React from "react";
import { CheckCircleOutlined, DownOutlined, ExclamationCircleOutlined, UpOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import CaseProgressExpandedCard from "./CaseProgressExpandedCard";
import { useNavigate, useParams } from "react-router-dom";
import { QText } from "../../common/Fonts";
import { useFormTranslation } from "../../../hooks/commonHooks";
import { useAppSelector } from "../../../app/hooks";

interface FillingApplicationSectionProps {
  currentStepDetails: any;
  expandedStep: string | null;
  handleToggleExpand: (stepName: string) => void;
  isLawyer: boolean;
  t: any;
  onCaseSummaryUpdate: () => void;
}

function FillingApplicationIcon({ percentage }: { percentage: number }) {
  return percentage === 100 ? (
    <CheckCircleOutlined style={{ color: "#52C41A", fontSize: "20px" }} />
  ) : (
    <ExclamationCircleOutlined style={{ color: "#fa8c16", fontSize: "20px" }} />
  );
}

const PercentageTag = ({ percentage }: { percentage: number }) => (
  <Tag className="custom-percentage-tag" style={{ color: "#828282" }}>
    {`${percentage}%`}
  </Tag>
);

const ProgressItem = ({
  title,
  percentage,
  stepName,
  sectionIndex,
  expandedStep,
  handleToggleExpand,
}: {
  title: string;
  percentage: number;
  stepName: string;
  sectionIndex: number;
  expandedStep: string | null;
  handleToggleExpand: (stepName: string) => void;
}) => {
  const { wt, t } = useFormTranslation();
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const handleGoCompleteClick = (sectionIndex: number) => {
    navigate(`/case/${id}?section=${sectionIndex}&subsection=0`);
  };

  return (
    <div className="progress-item" key={stepName}>
      <div className="progress-item-content" onClick={() => handleToggleExpand(stepName)}>
        <div className="icon-container">
          <FillingApplicationIcon percentage={percentage} />
        </div>
        <div className="progress-title">
          {expandedStep === stepName ? (
            <QText level="normal bold">{wt(title)}</QText>
          ) : (
            <QText level="normal" color="gray">
              {wt(title)}
            </QText>
          )}
          <PercentageTag percentage={percentage} />
        </div>
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
};

const FillingApplicationSection: React.FC<FillingApplicationSectionProps> = ({
  currentStepDetails,
  expandedStep,
  handleToggleExpand,
  isLawyer,
  t,
  onCaseSummaryUpdate,
}) => {
  const percentage = useAppSelector(state => state.form.percentage);

  return (
    <div className="progress-section">
      <QText level="normal" color="gray" margin="margin-bottom-20">
        {t("fillingDetailsMessage")}:
      </QText>
      {percentage && (
        <>
          {Object.keys(percentage)
            .filter(label => label !== "overall")
            .map((label, index) => (
              <React.Fragment key={label}>
                <ProgressItem
                  title={label}
                  percentage={percentage[label]?.avg}
                  stepName={label.toUpperCase()}
                  sectionIndex={index}
                  expandedStep={expandedStep}
                  handleToggleExpand={handleToggleExpand}
                />
                {expandedStep === label.toUpperCase() && (
                  <div className="expanded-card-container">
                    <div className="progress-line extended-line"></div>
                    <div className="expanded-card">
                      <CaseProgressExpandedCard
                        isLawyer={isLawyer}
                        substepName={"FILLING_DETAILS"}
                        substepMetadata={percentage[label]}
                        onCaseSummaryUpdate={onCaseSummaryUpdate}
                      />
                    </div>
                  </div>
                )}
                {index < Object.keys(percentage).length - 1 && (
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
