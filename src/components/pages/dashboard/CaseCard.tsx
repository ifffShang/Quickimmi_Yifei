import { CheckCircleTwoTone, CloseCircleTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { deleteCaseApi, updateCaseNameApi } from "../../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { CaseSubType, CaseType } from "../../../model/immigrationTypes";
import { updateCurrentCaseInfo } from "../../../reducers/caseSlice";
import { getCaseStatusAndColor } from "../../../utils/caseStatusUtils";
import { QText, SingleLine } from "../../common/Fonts";
import { DeleteConfirmModal } from "../../modals/case/DeleteConfirmModal";
import "./CaseCard.css";

export interface CaseCardProps {
  caseData: {
    id: number;
    userId: number;
    updatedAt: number;
    applicantName: string;
    caseName: string | null;
    overallPercentage: number;
    type: string;
    subType: string;
    asylumType: string;
    submittedAt: number;
    currentStep: string;
  };
  onDelete: () => void;
}

export function CaseCard({ caseData, onDelete }: CaseCardProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [CaseName, setCaseName] = useState(caseData.caseName || "");
  const [TempCaseName, setTempCaseName] = useState(caseData.caseName || "");
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const role = useAppSelector(state => state.auth.role);

  const openCaseDetails = async () => {
    if (!accessToken || !caseData.id) {
      console.error(`Access token ${accessToken} or case id ${caseData.id} is missing`);
      return;
    }
    dispatch(
      updateCurrentCaseInfo({
        caseId: caseData.id.toString(),
        caseType: caseData.type as CaseType,
        caseSubType: caseData.subType as CaseSubType,
      }),
    );
    navigate("/casestatus/" + caseData.id);
  };

  const deleteCase = async () => {
    if (!accessToken || !caseData.id) {
      console.error(`Access token ${accessToken} or case id ${caseData.id} is missing`);
      return;
    }
    deleteCaseApi(caseData.id, accessToken, role)
      .then(() => {
        onDelete();
      })
      .catch(err => {
        console.error(err);
      });
  };

  const saveCaseName = async () => {
    if (!accessToken || !caseData.id) {
      console.error(`Access token ${accessToken} or case id ${caseData.id} is missing`);
      return;
    }
    try {
      const success = await updateCaseNameApi(caseData.id, TempCaseName, accessToken, role);
      if (success) {
        setCaseName(handleCaseNameLength(TempCaseName));
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Failed to update case name:", err);
    }
  };

  const { status, color, backgroundColor, width } = getCaseStatusAndColor(caseData.currentStep);

  useEffect(() => {
    if (!caseData.caseName) {
      setCaseName(caseData.id.toString());
    } else {
      setTempCaseName(caseData.caseName);
      setCaseName(handleCaseNameLength(caseData.caseName));
    }
  }, [caseData]);

  const handleCaseNameLength = (name: string) => {
    if (name.length > 25) {
      return name.slice(0, 22) + "...";
    }
    return name;
  };

  const capitalizeFirstLetter = (string: string) => {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return "";
  };

  return (
    <div className="case-card-container">
      <p className="case-card-status" style={{ color, backgroundColor, width }}>
        {t(status)}
      </p>
      <div className="case-card-content">
        <div className="case-card-title">
          {isEditing ? (
            <div className="case-card-name">
              <Input
                value={TempCaseName}
                onChange={e => setTempCaseName(e.target.value)}
                className="case-card-name-input"
                placeholder="Enter new name"
              />
              <div className="case-card-name-buttons">
                <CheckCircleTwoTone
                  style={{ fontSize: 18, marginLeft: 5 }}
                  twoToneColor="#27AE60"
                  onClick={() => saveCaseName()}
                />
                <CloseCircleTwoTone
                  style={{ fontSize: 18, marginLeft: 8 }}
                  twoToneColor="#f5222d"
                  onClick={() => setIsEditing(false)}
                />
              </div>
            </div>
          ) : (
            <div className="case-card-name">
              <div className="case-card-caseName">
                <QText level="large">{CaseName || `Case ${caseData.id}`}</QText>
              </div>
              <EditTwoTone
                style={{ fontSize: 18, marginTop: 3, marginRight: 20 }}
                twoToneColor="#27AE60"
                onClick={() => setIsEditing(true)}
              />
            </div>
          )}
          <div className="case-card-progress">
            <div className="case-card-progress-inner" style={{ width: `${caseData.overallPercentage}%` }}></div>
            <div className="case-card-progress-text">
              <QText level="normal" color="gray">
                {caseData.overallPercentage === null
                  ? `${t("Completion")}: 0%`
                  : caseData.overallPercentage === 100
                    ? t("LawyerReview")
                    : `${t("Completion")}: ${caseData.overallPercentage}%`}
              </QText>
            </div>
          </div>
        </div>
        <div className="case-card-details">
          <SingleLine
            title={t("ApplicationType") + ": "}
            value={`${caseData.type} - ${capitalizeFirstLetter(caseData.asylumType)}`}
          />
          <SingleLine title={t("LastUpdatedAt") + ": "} value={new Date(caseData.updatedAt).toLocaleString()} />
          <SingleLine title={t("MasterApplicant") + ": "} value={caseData.applicantName || ""} />
          <SingleLine title={t("CaseId") + ": "} value={caseData.id.toString() || ""} />
        </div>
      </div>
      <div className="case-card-bottom">
        <Button type="default" onClick={() => setDeleteModalVisible(true)}>
          {t("Delete")}
        </Button>
        <Button type="primary" onClick={openCaseDetails}>
          {t("ViewDetails") + " >"}
        </Button>
      </div>

      <DeleteConfirmModal
        deleteItem="case"
        visible={deleteModalVisible}
        onConfirm={deleteCase}
        onCancel={() => setDeleteModalVisible(false)}
        contentName={caseData.id.toString()}
      />
    </div>
  );
}
