import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getCaseId } from "../../../utils/utils";
import { QText, SingleLine } from "../../common/Fonts";
import { CaseIcon } from "../../icons/Dashboard";
import "./CaseCard.css";
import { deleteCaseApi } from "../../../api/caseAPI";
import { resetFormState } from "../../../reducers/formSlice";

export interface CaseCardProps {
  caseId: number;
  onDelete: () => void;
}

export function CaseCard(props: CaseCardProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);

  const openCaseDetails = async () => {
    if (!accessToken || !props.caseId) {
      console.error(
        `Access token ${accessToken} or case id ${props.caseId} is missing`,
      );
      return;
    }
    navigate("/case/" + props.caseId);
  };

  const deleteCase = async () => {
    if (!accessToken || !props.caseId) {
      console.error(
        `Access token ${accessToken} or case id ${props.caseId} is missing`,
      );
      return;
    }
    deleteCaseApi(props.caseId, accessToken)
      .then(() => {
        props.onDelete();
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className="case-card-container">
      <CaseIcon />
      <div className="case-card-content">
        <div className="case-card-title">
          <QText level="large">{getCaseId(props.caseId)}</QText>
          <div className="case-card-progress">
            <div
              className="case-card-progress-inner"
              style={{ width: "0%" }}
            ></div>
            <div className="case-card-progress-text">
              <QText level="small" color="gray">
                Completion: 0%
              </QText>
            </div>
          </div>
        </div>
        <div className="case-card-details">
          <SingleLine title={t("ApplicationType") + ": "} value="Asylum-4" />
          <SingleLine title={t("LastUpdated") + ": "} value="Asylum-4" />
          <SingleLine title={t("MasterApplicant") + ": "} value="Asylum-4" />
        </div>
      </div>
      <div className="case-card-bottom">
        <Button type="default" onClick={deleteCase}>
          {t("Delete")}
        </Button>
        <Button type="primary" onClick={openCaseDetails}>
          {t("ViewDetails") + " >"}
        </Button>
      </div>
    </div>
  );
}
