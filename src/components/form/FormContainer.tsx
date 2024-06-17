import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { ScreenSize } from "../../model/commonModels";
import { useScreenSize } from "../../utils/screenSizeUtil";
import { QReturnLink } from "../common/Links";
import { Loading } from "../common/Loading";
import { FormContent } from "./FormContent";
import "./FormContainer.css";
import { FormHeader } from "./FormHeader";
import { FormNavigation } from "./FormNavigation";

export function FormContainer() {
  const navigate = useNavigate();
  const { id: caseId } = useParams<{ id: string }>(); // Get caseId from URL params
  const { t } = useTranslation();
  const form = useAppSelector(state => state.case.form);
  const indexLevel1 = useAppSelector(state => state.case.indexLevel1);
  const indexLevel2 = useAppSelector(state => state.case.indexLevel2);
  const screenSize = useScreenSize();
  const isSmallScreen =
    screenSize === ScreenSize.small || screenSize === ScreenSize.xsmall;

  if (!form || indexLevel1 === -1 || indexLevel2 === -1) {
    return (
      <div className="form-flow">
        <Loading />
      </div>
    );
  }

  const sectionId = form.steps[indexLevel1].id;
  const referenceId = form.steps[indexLevel1].steps[indexLevel2].referenceId;

  if (!sectionId || !referenceId) {
    return <Loading />;
  }

  return (
    <div className="form-flow">
      {screenSize !== ScreenSize.xsmall && (
        <div className="form-top">
          <QReturnLink
            onClick={() => navigate(`/casestatus/${caseId}`)}
            text={t("ReturnTocCaseSummaryPage")}
            margin="20px 0 15px 0"
          />
          <FormHeader />
        </div>
      )}
      <div className="form-flow-content">
        {!isSmallScreen && <FormNavigation />}
        {form && indexLevel1 !== -1 && indexLevel2 !== -1 ? (
          <FormContent sectionId={sectionId} referenceId={referenceId} />
        ) : (
          <div>
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
}
