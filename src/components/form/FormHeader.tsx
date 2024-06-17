import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../app/hooks";
import { updateApplicationCaseFunc } from "../../utils/functionUtils";
import { QText } from "../common/Fonts";
import { EditForm } from "../icons/Form";
import "./FormHeader.css";

export function FormHeader() {
  const { t } = useTranslation();
  const applicationCase = useAppSelector(state => state.form.applicationCase);
  const percentage = useAppSelector(state => state.form.percentage);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const percentageNumber = percentage?.overall?.avg ?? 0;

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
        </div>
      </div>
      <div className="form-header-save">
        <Button
          type="primary"
          className="form-header-save-btn"
          onClick={() =>
            updateApplicationCaseFunc(applicationCase, percentage, accessToken)
          }
        >
          {t("Save")}
        </Button>
      </div>
      <div className="form-header-icon">
        <EditForm />
      </div>
    </div>
  );
}
