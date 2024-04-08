import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useFormTranslation } from "../../hooks/commonHooks";
import { FormStep } from "../../model/FormModels";
import { setIndexLevel1, setIndexLevel2 } from "../../reducers/caseSlice";
import { QText } from "../common/Fonts";
import "./FormNavigation.css";

export interface FormNavigationProps {
  steps: FormStep[];
}

export function FormNavigation(props: FormNavigationProps) {
  const { wt } = useFormTranslation();
  const dispatch = useAppDispatch();
  const indexLevel1 = useAppSelector(state => state.case.indexLevel1);

  return (
    <div className="form-navigation">
      {props.steps.map((level1, index) => (
        <div
          className="form-navigation-level1"
          key={index}
          onClick={() => {
            dispatch(setIndexLevel1(level1.order));
          }}>
          <div className={indexLevel1 === level1.order ? "font-bold" : ""}>
            <QText level="large">{wt(level1.label)}</QText>
          </div>
          {level1.steps.map((level2, subIndex) => (
            <div
              className="form-navigation-level2"
              key={subIndex}
              onClick={() => {
                dispatch(
                  setIndexLevel2({
                    indexLevel1: level1.order,
                    indexLevel2: level2.order,
                  }),
                );
              }}>
              <div
                className={
                  indexLevel1 === level1.order && level2.order === indexLevel1
                    ? "font-bold"
                    : ""
                }>
                <QText level="small">{wt(level2.label)}</QText>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
