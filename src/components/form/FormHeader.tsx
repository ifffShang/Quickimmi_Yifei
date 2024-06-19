import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../app/hooks";
import { updateApplicationCaseFunc } from "../../utils/functionUtils";
import { QText } from "../common/Fonts";
import { EditForm } from "../icons/Form";
import "./FormHeader.css";
import { AutoSaveTag } from "./parts/AutoSaveTag";
import { generateDocumentsApi } from "../../api/caseAPI";

export function FormHeader() {
  const { t } = useTranslation();
  const applicationCase = useAppSelector(state => state.form.applicationCase);
  const percentage = useAppSelector(state => state.form.percentage);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const percentageNumber = percentage?.overall?.avg ?? 0;

  const generateDocument = () => {
    if (!applicationCase || !applicationCase.id || !accessToken) {
      console.error("Case ID or access token is not available");
      return;
    }
    generateDocumentsApi(accessToken, applicationCase.id);
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
          onClick={() =>
            updateApplicationCaseFunc(applicationCase, percentage, accessToken)
          }
        >
          {t("Save")}
        </Button>
        <Button type="primary" onClick={generateDocument}>
          {t("Generate Documents")}
        </Button>
      </div>
      <div className="form-header-icon">
        <EditForm />
      </div>
    </div>
  );
}
