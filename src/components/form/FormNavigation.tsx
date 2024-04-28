import { Collapse, CollapseProps } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useFormTranslation } from "../../hooks/commonHooks";
import { ScreenSize } from "../../model/commonModels";
import { setIndexLevel2 } from "../../reducers/caseSlice";
import { QText } from "../common/Fonts";
import { Menu, MenuItem } from "../common/Menu";
import { NavDown, NavUp } from "../icons/ArrowDown";
import "./FormNavigation.css";

export function FormNavigation() {
  const { wt } = useFormTranslation();
  const dispatch = useAppDispatch();
  const indexLevel1 = useAppSelector(state => state.case.indexLevel1);
  const indexLevel2 = useAppSelector(state => state.case.indexLevel2);
  const screenSize = useAppSelector(state => state.common.screenSize);
  const { steps } = useAppSelector(state => state.case.form);

  if (!steps || steps.length === 0) {
    return null;
  }

  if (screenSize === ScreenSize.xsmall || screenSize === ScreenSize.small) {
    const items = [] as MenuItem[];
    for (let l1 = 0; l1 < steps.length; l1++) {
      items.push({
        key: `${l1}`,
        label: <QText level="normal bold">{wt(steps[l1].label)}</QText>,
      });
      for (let l2 = 0; l2 < steps[l1].steps.length; l2++) {
        items.push({
          key: `${l1}-${l2}`,
          label: <QText>{wt(steps[l1].steps[l2].label)}</QText>,
          onClick: () =>
            dispatch(
              setIndexLevel2({
                indexLevel1: l1,
                indexLevel2: l2,
              }),
            ),
        });
      }
    }
    return (
      <Menu items={items} popupPosition="bottom-right" optionAlign="left" />
    );
  }

  // Below are the UI for large and medium screens
  const items: CollapseProps["items"] = steps.map((level1, l1Index) => {
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
                }
              >
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
