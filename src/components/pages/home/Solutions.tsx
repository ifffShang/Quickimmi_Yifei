import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { CheckCircleFilled, ArrowRightOutlined } from "@ant-design/icons";
import { QText } from "../../common/Fonts";
import { ArrowRightPrimary } from "../../icons/ArrowDown";
import { AiComplete, AiTranslate, ManAndComputer, AiIntelligent } from "../../icons/ProductFeatures";
import { TextBlock } from "./Common";
import { useAppSelector } from "../../../app/hooks";
import { ScreenSize } from "../../../model/commonModels";
import "./Solutions.css";

function SupportedImmigrationTypes() {
  const { t } = useTranslation();

  return (
    <div className="supported-immigration">
      <div className="supported-immigration-title">{t("LandingPage.SupportedImmigrationTypes")}</div>
      <div className="supported-immigration-types">
        <div>ASYLUM</div>
        <div>NIW</div>
        <div>H1B</div>
        <div>B1</div>
      </div>
    </div>
  );
}

function SolutionCheckList(props: { itemList: string[] }) {
  return (
    <div className="solution-checklist">
      {props.itemList.map((item, index) => (
        <div key={index} className="solution-checklist-item">
          <CheckCircleFilled style={{ color: "#27AE60" }} />
          <QText level="normal" color="dark">
            {item}
          </QText>
        </div>
      ))}
    </div>
  );
}

export function Solutions() {
  const { t } = useTranslation();
  const screenSize = useAppSelector(state => state.common.screenSize);
  const navigate = useNavigate();

  return (
    <div className="home-solutions">
      <div className="section-title-button">
        <QText level="normal bold" color="dark">
          {t("LandingPage.Solution")}
        </QText>
      </div>
      <TextBlock
        title={t("LandingPage.SolutionTitle")}
        titleLevel="h2"
        align="center"
        customizedCss="solution-text-block"
      />

      <div className="hs-section">
        <div className="hs-section-description">
          <TextBlock
            title={t("LandingPage.AutoDocGeneration")}
            titleLevel="h2"
            description={t("LandingPage.AutoDocGenerationDescription")}
            align={screenSize === ScreenSize.small || screenSize === ScreenSize.xsmall ? "center" : "left"}
            customizedCss="solution-text-block"
          />
          <SolutionCheckList
            itemList={[t("LandingPage.AutoDocGenerationListItem1"), t("LandingPage.AutoDocGenerationListItem2 ")]}
          />
          <Button
            type="primary"
            size="large"
            icon={<ArrowRightOutlined />}
            className="home-solutions-button"
            onClick={() => navigate("/signin")}
          >
            {t("LandingPage.TryForFree")}
          </Button>
        </div>
        <AiTranslate />
      </div>

      <div className="hs-section">
        <AiComplete />
        <div className="hs-section-description">
          <TextBlock
            title={t("LandingPage.AiInfoCollection")}
            titleLevel="h2"
            description={t("LandingPage.AiInfoCollectionDescription")}
            align={screenSize === ScreenSize.small || screenSize === ScreenSize.xsmall ? "center" : "left"}
            customizedCss="solution-text-block"
          />
          <SolutionCheckList
            itemList={[
              t("LandingPage.AiInfoCollectionListItem1"),
              t("LandingPage.AiInfoCollectionListItem2"),
              t("LandingPage.AiInfoCollectionListItem3"),
            ]}
          />
          <Button
            type="primary"
            size="large"
            icon={<ArrowRightOutlined />}
            className="home-solutions-button"
            onClick={() => navigate("/signin")}
          >
            {t("LandingPage.TryForFree")}
          </Button>
        </div>
      </div>

      <div className="hs-section">
        <div className="hs-section-description">
          <TextBlock
            title={t("LandingPage.SmartCaseManagement")}
            titleLevel="h2"
            description={t("LandingPage.SmartCaseManagementDescription")}
            align={screenSize === ScreenSize.small || screenSize === ScreenSize.xsmall ? "center" : "left"}
            customizedCss="solution-text-block"
          />
          <SolutionCheckList
            itemList={[t("LandingPage.SmartCaseManagementListItem1"), t("LandingPage.SmartCaseManagementListItem2")]}
          />
          <Button
            type="primary"
            size="large"
            icon={<ArrowRightOutlined />}
            className="home-solutions-button"
            onClick={() => navigate("/signin")}
          >
            {t("LandingPage.TryForFree")}
          </Button>
        </div>
        <ManAndComputer />
      </div>

      <div className="hs-section">
        <AiIntelligent />
        <div className="hs-section-description">
          <TextBlock
            title={t("LandingPage.AiAssist")}
            titleLevel="h2"
            description={t("LandingPage.AiAssistDescription")}
            align={screenSize === ScreenSize.small || screenSize === ScreenSize.xsmall ? "center" : "left"}
            customizedCss="solution-text-block"
          />
          <SolutionCheckList
            itemList={[
              t("LandingPage.AiAssistListItem1"),
              t("LandingPage.AiAssistListItem2"),
              t("LandingPage.AiAssistListItem3"),
            ]}
          />
          <Button
            type="primary"
            size="large"
            icon={<ArrowRightOutlined />}
            className="home-solutions-button"
            onClick={() => navigate("/signin")}
          >
            {t("LandingPage.TryForFree")}
          </Button>
        </div>
      </div>
    </div>
  );
}
