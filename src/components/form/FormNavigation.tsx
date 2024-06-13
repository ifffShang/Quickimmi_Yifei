import { LeftCircleOutlined } from "@ant-design/icons";
import { Collapse, CollapseProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useFormTranslation } from "../../hooks/commonHooks";
import { ScreenSize } from "../../model/commonModels";
import { setIndexLevel2 } from "../../reducers/caseSlice";
import { QText } from "../common/Fonts";
import { Menu, MenuItem } from "../common/Menu";
import { NavDown, NavUp } from "../icons/ArrowDown";
import "./FormNavigation.css";
import { StandaloneSteps } from "./parts/StandaloneSteps";

export function FormNavigation() {
  const { wt, t } = useFormTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const indexLevel1 = useAppSelector(state => state.case.indexLevel1);
  const indexLevel2 = useAppSelector(state => state.case.indexLevel2);
  const screenSize = useAppSelector(state => state.common.screenSize);
  // Added default value for steps to ensure it's always defined
  const { steps } = useAppSelector(state => state.case.form || { steps: [] });

  if (!steps || steps.length === 0) {
    return null;
  }

  if (screenSize === ScreenSize.xsmall || screenSize === ScreenSize.small) {
    const items = [] as MenuItem[];
    items.push({
      key: "Dashboard",
      label: (
        <QText level="normal bold" color="primary">
          <LeftCircleOutlined /> {t("Dashboard.Dashboard")}
        </QText>
      ),
      onClick: () => navigate("/dashboard"),
    });
    for (let l1 = 0; l1 < steps.length; l1++) {
      items.push({
        key: `${l1}`,
        label: <QText level="normal bold">{wt(steps[l1].label)}</QText>,
      });
      for (let l2 = 0; l2 < steps[l1].steps.length; l2++) {
        items.push({
          key: `${l1}-${l2}`,
          label: <QText>{wt(steps[l1].steps[l2].label)}</QText>,
          selected: indexLevel1 === l1 && indexLevel2 === l2,
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

  let standaloneSteps = [] as CollapseProps["items"];

  // Below are the UI for large and medium screens
  const items: CollapseProps["items"] = steps.reduce(
    (result, level1, l1Index) => {
      const item = {
        key: l1Index,
        label: <QText level="normal bold">{wt(level1.label)}</QText>,
        children: (
          <div>
            {level1.steps.map((level2, l2Index) => {
              let css = level1.standalone ? "standalone " : "";
              css +=
                indexLevel2 === l2Index && indexLevel1 === l1Index
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

      if (!result) result = [];
      if (!standaloneSteps) standaloneSteps = [];

      if (level1.standalone) {
        standaloneSteps.push(item);
      } else {
        result.push(item);
      }
      return result;
    },
    [] as CollapseProps["items"],
  );

  const expandIcon = (props: any) => {
    if (props?.isActive) {
      return <NavDown />;
    }
    return <NavUp />;
  };

  return (
    <div className="form-navigation">
      {/* <div
        className="form-navigation-return"
        onClick={() => navigate("/dashboard")}
      >
        <LeftCircleOutlined />
        <QText level="medium" color="primary">
          Dashboard
        </QText>
      </div> */}
      <Collapse
        className="form-navigation-collapse"
        defaultActiveKey={indexLevel1}
        expandIcon={expandIcon}
        expandIconPosition="end"
        size="large"
        ghost
        items={items}
      />
      <StandaloneSteps steps={standaloneSteps} />
    </div>
  );
}
