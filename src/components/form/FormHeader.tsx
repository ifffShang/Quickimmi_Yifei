import { useTranslation } from "react-i18next";
import { QText } from "../common/Fonts";
import "./FormHeader.css";
import { EditForm } from "../icons/Form";
import { Button } from "antd";
import { updateApplicationCaseApi } from "../../api/caseAPI";
import { getUpdateApplicationCaseData } from "../../utils/utils";
import { useAppSelector } from "../../app/hooks";
import { updateApplicationCaseFunc } from "../../utils/functionUtils";

export function FormHeader() {
  const { t } = useTranslation();
  const applicationCase = useAppSelector(state => state.form.applicationCase);
  const accessToken = useAppSelector(state => state.auth.accessToken);

  return (
    <div className="form-header">
      <div className="form-header-title">
        <QText level="xlarge">{t("Complete Form")}</QText>
        <div className="form-header-tags">
          <div className="form-header-tag">
            <QText level="xsmall">{t("Total progress") + " 0%"}</QText>
          </div>
        </div>
      </div>
      <div className="form-header-right">
        <div className="form-header-save">
          <Button
            type="primary"
            className="form-header-save-btn"
            onClick={() =>
              updateApplicationCaseFunc(applicationCase, accessToken)
            }
          >
            {t("Save")}
          </Button>
        </div>
        <div className="form-header-icon">
          <EditForm />
        </div>
      </div>
    </div>
  );
}
