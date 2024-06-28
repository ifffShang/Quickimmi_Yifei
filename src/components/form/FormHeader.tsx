import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { generateDocumentsApi } from "../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateApplicationCaseFunc } from "../../utils/functionUtils";
import { QText } from "../common/Fonts";
import { EditForm } from "../icons/Form";
import "./FormHeader.css";
import { AutoSaveTag } from "./parts/AutoSaveTag";
import { incrementSaveTimes } from "../../reducers/formSlice";

export function FormHeader() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const caseId = useAppSelector(state => state.form.caseId);
  const profile = useAppSelector(state => state.form.applicationCase.profile);
  const progress = useAppSelector(state => state.form.applicationCase.progress);
  const percentage = useAppSelector(state => state.form.percentage);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const role = useAppSelector(state => state.auth.role);
  const percentageNumber = percentage?.overall?.avg ?? 0;

  const generateDocument = () => {
    if (!caseId || !accessToken) {
      console.error("Case ID or access token is not available");
      return;
    }
    generateDocumentsApi(accessToken, caseId, role);
  };

  return (
    <div className="form-header">
      <div className="form-header-title">
        <QText level="xlarge">{t("Complete Form")}</QText>
        <div className="form-header-tags">
          <div className="form-header-tag">
            <QText level="xsmall">
              {t("Total progress") + ": " + percentageNumber + "%"}
            </QText>
          </div>
          <AutoSaveTag />
        </div>
      </div>
      <div className="form-header-action">
        <Button
          type="primary"
          className="form-header-save-btn"
          onClick={() => {
            try {
              updateApplicationCaseFunc(
                profile,
                progress,
                percentage,
                role,
                accessToken,
              );
              dispatch(incrementSaveTimes());
            } catch (err) {
              console.error(err);
            }
          }}
        >
          {t("Save")}
        </Button>
        <Button
          type="primary"
          onClick={generateDocument}
          disabled={percentageNumber !== 100}
        >
          {t("Generate Documents")}
        </Button>
      </div>
      <div className="form-header-icon">
        <EditForm />
      </div>
    </div>
  );
}
