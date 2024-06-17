import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { ScreenSize } from "../../model/commonModels";
import { FormContent } from "./FormContent";
import { LawyerPreForm } from "./LawyerPreForm";
import "./FormFlow.css";
import { FormHeader } from "./FormHeader";
import { FormNavigation } from "./FormNavigation";
import { QReturnLink } from "../common/Links";
import { useTranslation } from "react-i18next";
import { Loading } from "../common/Loading";

interface FormFlowProps {
  isLawyer?: boolean;
  lawyerNewCase?: boolean;
}

export function FormFlow({ isLawyer, lawyerNewCase = false }: FormFlowProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const form = useAppSelector(state => state.case.form);
  const indexLevel1 = useAppSelector(state => state.case.indexLevel1);
  const indexLevel2 = useAppSelector(state => state.case.indexLevel2);
  const screenSize = useAppSelector(state => state.common.screenSize);
  const isSmallScreen =
    screenSize === ScreenSize.small || screenSize === ScreenSize.xsmall;

  if (!form || indexLevel1 === -1 || indexLevel2 === -1) {
    return <Loading />;
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
            onClick={() => navigate("/dashboard")}
            text={t("ReturnToDashboard")}
            margin="20px 0 15px 0"
          />
          <FormHeader />
        </div>
      )}
      <div className="form-flow-content">
        {!isSmallScreen && !isLawyer && <FormNavigation />}
        {lawyerNewCase ? (
          <LawyerPreForm />
        ) : (
          <FormContent
            sectionId={sectionId}
            referenceId={referenceId}
            isLawyer={isLawyer}
          />
        )}
      </div>
    </div>
  );
}
