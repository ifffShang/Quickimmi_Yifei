import { Collapse, CollapseProps } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useFormTranslation } from "../../hooks/commonHooks";
import { IFormStep } from "../../model/FormModels";
import { QText } from "../common/Fonts";
import { NavDown, NavUp } from "../icons/ArrowDown";
import "./FormNavigation.css";
import { setIndexLevel2 } from "../../reducers/caseSlice";

export interface FormNavigationProps {
  steps: IFormStep[];
}

export function FormNavigation(props: FormNavigationProps) {
  const { wt } = useFormTranslation();
  const dispatch = useAppDispatch();
  const indexLevel1 = useAppSelector(state => state.case.indexLevel1);
  const indexLevel2 = useAppSelector(state => state.case.indexLevel2);

  const items: CollapseProps["items"] = props.steps.map((level1, l1Index) => {
    return {
      key: l1Index,
      label: <QText level="normal bold">{wt(level1.label)}</QText>,
      children: (
        <div>
          {level1.steps.map((level2, l2Index) => {
            const css =
              indexLevel2 === l2Index
                ? "form-navigation-l2 active"
                : "form-navigation-l2";
            return (
              <div
                className={css}
                key={l2Index}
                onClick={() =>
                  dispatch(
                    setIndexLevel2({
                      indexLevel1: l1Index,
                      indexLevel2: l2Index,
                    }),
                  )
                }>
                <QText>{wt(level2.label)}</QText>
              </div>
            );
          })}
        </div>
      ),
    };
  });

  const expandIcon = (props: any) => {
    if (props?.isActive) {
      return <NavDown />;
    }
    return <NavUp />;
  };

  return (
    <div className="form-navigation">
      <Collapse
        defaultActiveKey={indexLevel1}
        expandIcon={expandIcon}
        expandIconPosition="end"
        size="large"
        ghost
        items={items}
      />
    </div>
  );
}
