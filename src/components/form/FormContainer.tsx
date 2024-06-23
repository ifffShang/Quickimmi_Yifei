import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useAutoSaveApplicationCase } from "../../hooks/cacheHooks";
import { ScreenSize } from "../../model/commonModels";
import { setIndexLevel2 } from "../../reducers/caseSlice";
import { useScreenSize } from "../../utils/screenSizeUtil";
import { isNullOrUndefined } from "../../utils/utils";
import { QReturnLink } from "../common/Links";
import { Loading } from "../common/Loading";
import "./FormContainer.css";
import { FormContent } from "./FormContent";
import { FormHeader } from "./FormHeader";
import { FormNavigation } from "./FormNavigation";

export function FormContainer() {
  const navigate = useNavigate();
  const { id: caseId, sectionIndex, subsectionIndex } = useParams(); // Get caseId from URL params
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const role = useAppSelector(state => state.auth.role);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const form = useAppSelector(state => state.case.form);
  const indexLevel1 = useAppSelector(state => state.case.indexLevel1);
  const indexLevel2 = useAppSelector(state => state.case.indexLevel2);
  const screenSize = useScreenSize();
  const isSmallScreen =
    screenSize === ScreenSize.small || screenSize === ScreenSize.xsmall;

  const [searchParams, setSearchParams] = useSearchParams();

  useAutoSaveApplicationCase(accessToken, role, dispatch);

  useEffect(() => {
    const sectionIndex = searchParams.get("section");
    const subsectionIndex = searchParams.get("subsection");
    if (
      isNullOrUndefined(sectionIndex) ||
      isNullOrUndefined(subsectionIndex) ||
      (indexLevel1 === parseInt(sectionIndex!) &&
        indexLevel2 === parseInt(subsectionIndex!))
    ) {
      return;
    }
    dispatch(
      setIndexLevel2({
        indexLevel1: parseInt(sectionIndex!),
        indexLevel2: parseInt(subsectionIndex!),
      }),
    );
  }, [searchParams]);

  useEffect(() => {
    if (indexLevel1 === -1 || indexLevel2 === -1) {
      return;
    }
    setSearchParams({
      section: indexLevel1.toString(),
      subsection: indexLevel2.toString(),
    });
  }, [indexLevel1, indexLevel2]);

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
