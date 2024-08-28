import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { CheckCircleFilled, ArrowRightOutlined } from "@ant-design/icons";
import { QText } from "../../common/Fonts";
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

function SolutionCheckList({ itemList }: { itemList: string[] }) {
  return (
    <div className="solutions-checklist">
      {itemList.map((item, index) => (
        <div key={index} className="solutions-checklist-item">
          <CheckCircleFilled style={{ color: "#27AE60" }} />
          <QText level="normal" color="dark">
            {item}
          </QText>
        </div>
      ))}
    </div>
  );
}

function SolutionSection({
  title,
  description,
  itemList,
  icon: IconComponent,
  align,
  navigateTo,
  picOnLeft,
}: {
  title: string;
  description: string;
  itemList: string[];
  icon: React.ElementType;
  align: "left" | "center";
  navigateTo: string;
  picOnLeft?: boolean;
}) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="home-solutions-section">
      {picOnLeft ? IconComponent && <IconComponent /> : <></>}
      <div className="home-solutions-section-description">
        <TextBlock
          title={title}
          titleLevel="h2"
          description={description}
          align={align}
          customizedCss="home-solutions-text-block"
        />
        <SolutionCheckList itemList={itemList} />
        <Button
          type="primary"
          size="large"
          icon={<ArrowRightOutlined />}
          className="home-solutions-button"
          onClick={() => navigate(navigateTo)}
        >
          {t("LandingPage.TryForFree")}
        </Button>
      </div>
      {picOnLeft ? <></> : IconComponent && <IconComponent />}
    </div>
  );
}

export function Solutions() {
  const { t } = useTranslation();
  const screenSize = useAppSelector(state => state.common.screenSize);
  const align = screenSize === ScreenSize.small || screenSize === ScreenSize.xsmall ? "center" : "left";

  const solutionSections = [
    {
      title: t("LandingPage.AutoDocGeneration"),
      description: t("LandingPage.AutoDocGenerationDescription"),
      itemList: [t("LandingPage.AutoDocGenerationListItem1"), t("LandingPage.AutoDocGenerationListItem2")],
      icon: AiTranslate,
      navigateTo: "/signin",
      picOnLeft: false,
    },
    {
      title: t("LandingPage.AiInfoCollection"),
      description: t("LandingPage.AiInfoCollectionDescription"),
      itemList: [
        t("LandingPage.AiInfoCollectionListItem1"),
        t("LandingPage.AiInfoCollectionListItem2"),
        t("LandingPage.AiInfoCollectionListItem3"),
      ],
      icon: AiComplete,
      navigateTo: "/signin",
      picOnLeft: true,
    },
    {
      title: t("LandingPage.SmartCaseManagement"),
      description: t("LandingPage.SmartCaseManagementDescription"),
      itemList: [t("LandingPage.SmartCaseManagementListItem1"), t("LandingPage.SmartCaseManagementListItem2")],
      icon: ManAndComputer,
      navigateTo: "/signin",
      picOnLeft: false,
    },
    {
      title: t("LandingPage.AiAssist"),
      description: t("LandingPage.AiAssistDescription"),
      itemList: [
        t("LandingPage.AiAssistDescriptionListItem1"),
        t("LandingPage.AiAssistDescriptionListItem2"),
        t("LandingPage.AiAssistDescriptionListItem3"),
      ],
      icon: AiIntelligent,
      navigateTo: "/signin",
      picOnLeft: true,
    },
  ];

  return (
    <div className="home-solutions">
      <div className="section-title">
        <QText level="normal bold" color="dark">
          {t("LandingPage.Solution")}
        </QText>
      </div>
      <TextBlock
        title={t("LandingPage.SolutionTitle")}
        titleLevel="h2"
        align="center"
        customizedCss="home-solutions-title-block"
      />
      {solutionSections.map((section, index) => (
        <SolutionSection
          key={index}
          title={section.title}
          description={section.description}
          itemList={section.itemList}
          icon={section.icon}
          align={align}
          navigateTo={section.navigateTo}
          picOnLeft={section.picOnLeft}
        />
      ))}
    </div>
  );
}
