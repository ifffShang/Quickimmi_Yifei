import { useState, useEffect } from "react";
import { Button, Input } from "antd";
import { EditTwoTone, CloseCircleTwoTone, CheckCircleTwoTone } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { deleteCaseApi, updateCaseNameApi, getCaseSummaryApi } from "../../../api/caseAPI";
import { useAppSelector } from "../../../app/hooks";
import { getCaseId } from "../../../utils/utils";
import { QText, SingleLine } from "../../common/Fonts";
import { CaseIcon } from "../../icons/Dashboard";
import { DeleteConfirmModal } from "../../modals/case/DeleteConfirmModal";
import { CacheStore } from "../../../cache/cache";
import "./CaseCard.css";
import { set } from "lodash";

export interface CaseCardProps {
  caseData: {
    id: number;
    userId: number;
    updatedAt: number;
    applicantName: string;
    caseName: string | null;
    overallPercentage: number;
    type: string;
    asylumType: string;
    submittedAt: number;
    currentStep: string;
  };
  onDelete: () => void;
}

export function CaseCard({ caseData, onDelete }: CaseCardProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [CaseName, setCaseName] = useState(caseData.caseName || "");
  const [TempCaseName, setTempCaseName] = useState(caseData.caseName || "");
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const role = useAppSelector(state => state.auth.role);

  useEffect(() => {
    if (!caseData.caseName) {
      setCaseName(caseData.id.toString());
    } else {
      setTempCaseName(caseData.caseName);
      setCaseName(handleCaseNameLength(caseData.caseName));
    }
  }, [caseData]);

  const openCaseDetails = async () => {
    if (!accessToken || !caseData.id) {
      console.error(`Access token ${accessToken} or case id ${caseData.id} is missing`);
      return;
    }
    CacheStore.clear();
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
      const summary = await getCaseSummaryApi(caseData.id, accessToken, role);
      console.log("Summary case name: " + summary.caseName);
      if (success) {
        setCaseName(handleCaseNameLength(TempCaseName));
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Failed to update case name:", err);
    }
  };

  const handleCaseNameLength = (name: string) => {
    if (name.length > 25) {
      return name.slice(0, 22) + "...";
    }
    return name;
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className="case-card-container">
      <div className="case-card-caseIcon">
        <CaseIcon />
      </div>
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
                  style={{ fontSize: 28, marginLeft: 5 }}
                  twoToneColor="#27AE60"
                  onClick={() => saveCaseName()}
                />
                <CloseCircleTwoTone
                  style={{ fontSize: 28, marginLeft: 8 }}
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
                style={{ fontSize: 28, marginLeft: 5 }}
                twoToneColor="#27AE60"
                onClick={() => setIsEditing(true)}
              />
            </div>
          )}
          <div className="case-card-progress">
            <div className="case-card-progress-inner" style={{ width: `${caseData.overallPercentage}%` }}></div>
            <div className="case-card-progress-text">
              <QText level="small" color="gray">
                Completion: {caseData.overallPercentage}%
              </QText>
            </div>
          </div>
        </div>
        <div className="case-card-details">
          <SingleLine title={t("ApplicationType") + ": "} value={`${caseData.type} - ${capitalizeFirstLetter(caseData.asylumType)}`} />
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
