import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateApplicationCaseFunc } from "../../utils/functionUtils";
import { QText } from "../common/Fonts";
import { EditForm } from "../icons/Form";
import "./FormHeader.css";
import { AutoSaveTag } from "./parts/AutoSaveTag";
import { incrementSaveTimes } from "../../reducers/formSlice";
import { getProfile } from "../../utils/selectorUtils";

export function FormHeader() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const caseType = useAppSelector(state => state.case.currentCaseType);
  const caseId = useAppSelector(state => state.form.caseId);
  const applicationCase = useAppSelector(state => state.form.applicationCase);
  const progress = useAppSelector(state => state.form.applicationCase.progress);
  const percentage = useAppSelector(state => state.form.percentage);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const role = useAppSelector(state => state.auth.role);
  const percentageNumber = percentage?.overall?.avg ?? 0;
  const profile = getProfile(caseType, applicationCase);

  return (
    <div className="form-header">
      <div className="form-header-title">
        <QText level="xlarge">{t("Complete Form")}</QText>
        <div className="form-header-tags">
          <div className="form-header-tag">
            <QText level="xsmall">{t("Total Progress") + ": " + percentageNumber + "%"}</QText>
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
              if (!caseId || !accessToken || !caseType || !profile) {
                console.error("Case ID, access token or case type is not available");
                return;
              }
              updateApplicationCaseFunc(caseId, profile, progress, percentage, role, accessToken, caseType);
              dispatch(incrementSaveTimes());
            } catch (err) {
              console.error(err);
            }
          }}
        >
          {t("Save")}
        </Button>
        {/*<Button*/}
        {/*  type="primary"*/}
        {/*  onClick={generateDocument}*/}
        {/*  disabled={percentageNumber !== 100}*/}
        {/*>*/}
        {/*  {t("Generate Documents")}*/}
        {/*</Button>*/}
      </div>
      <div className="form-header-icon">
        <EditForm />
      </div>
    </div>
  );
}
