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
import { getCorrectedIndexes } from "../../utils/caseUtils";
import useRenderingTrace from "../../hooks/renderHooks";

export function FormContainer() {
  const navigate = useNavigate();
  const { id: caseId } = useParams(); // Get caseId from URL params
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const role = useAppSelector(state => state.auth.role);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const form = useAppSelector(state => state.case.form);
  const indexLevel1 = useAppSelector(state => state.case.indexLevel1);
  const indexLevel2 = useAppSelector(state => state.case.indexLevel2);
  const caseType = useAppSelector(state => state.case.currentCaseType);
  const screenSize = useScreenSize();
  const isSmallScreen = screenSize === ScreenSize.small || screenSize === ScreenSize.xsmall;

  const [searchParams, setSearchParams] = useSearchParams();

  const caseIdInt = caseId ? parseInt(caseId) : -1;

  useAutoSaveApplicationCase(caseIdInt, accessToken, role, caseType, dispatch);

  useEffect(() => {
    const sectionIndex = searchParams.get("section");
    const subsectionIndex = searchParams.get("subsection");
    if (isNullOrUndefined(sectionIndex) || isNullOrUndefined(subsectionIndex)) {
      return;
    }

    const { correctedIndexLevel1, correctedIndexLevel2 } = getCorrectedIndexes(
      form,
      parseInt(sectionIndex!),
      parseInt(subsectionIndex!),
    );

    if (correctedIndexLevel1 !== indexLevel1 || correctedIndexLevel2 !== indexLevel2) {
      dispatch(
        setIndexLevel2({
          indexLevel1: correctedIndexLevel1,
          indexLevel2: correctedIndexLevel2,
        }),
      );
    }
  }, [searchParams]);

  useEffect(() => {
    if (indexLevel1 === -1 || indexLevel2 === -1) {
      return;
    }
    const { correctedIndexLevel1, correctedIndexLevel2 } = getCorrectedIndexes(form, indexLevel1, indexLevel2);
    setSearchParams({
      section: correctedIndexLevel1.toString(),
      subsection: correctedIndexLevel2.toString(),
    });
  }, [indexLevel1, indexLevel2]);

  useRenderingTrace("FormContainer", {
    form,
    indexLevel1,
    indexLevel2,
    screenSize,
    searchParams,
    accessToken,
    role,
    caseId,
  });

  if (!form || !form.steps || indexLevel1 === -1 || indexLevel2 === -1) {
    return (
      <div className="form-flow">
        <Loading />
      </div>
    );
  }

  const sectionLabel = form.steps[indexLevel1]?.label;
  const subSectionLabel = form.steps[indexLevel1]?.steps?.[indexLevel2]?.label;
  const referenceId = form.steps[indexLevel1]?.steps?.[indexLevel2]?.referenceId;

  if (!referenceId || !sectionLabel || !subSectionLabel) {
    return (
      <div className="form-flow">
        <Loading />
      </div>
    );
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
          <FormContent sectionLabel={sectionLabel} subSectionLabel={subSectionLabel} referenceId={referenceId!} />
        ) : (
          <div>
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
}
