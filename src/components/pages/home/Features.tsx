import React from "react";
import { useTranslation } from "react-i18next";
import { QText } from "../../common/Fonts";
import { DocGenerate, Rocket, Check, LawyerClient, Diamond, DataSecurity } from "../../icons/HomeFeatures";
import { TextBlock } from "./Common";
import { useAppSelector } from "../../../app/hooks";
import { ScreenSize } from "../../../model/commonModels";
import "./Features.css";

const featuresItemMapLeft = [
  {
    title: "LandingPage.FeatureInstantDocGeneration",
    description: "LandingPage.FeatureInstantDocGenerationDescription",
    icon: <DocGenerate />,
  },
  {
    title: "LandingPage.FeatureNoErrorDocumentation",
    description: "LandingPage.FeatureNoErrorDocumentationDescription",
    icon: <Check />,
  },
  {
    title: "LandingPage.FeatureProfitBoost",
    description: "LandingPage.FeatureProfitBoostDescription",
    icon: <Diamond />,
  },
];

const featuresItemMapRight = [
  {
    title: "LandingPage.FeatureCasePreparation",
    description: "LandingPage.FeatureCasePreparationDescription",
    icon: <Rocket />,
  },
  {
    title: "LandingPage.FeatureLawyerClientInteraction",
    description: "LandingPage.FeatureLawyerClientInteractionDescription",
    icon: <LawyerClient />,
  },
  {
    title: "LandingPage.FeatureDataSecurity",
    description: "LandingPage.FeatureDataSecurityDescription",
    icon: <DataSecurity />,
  },
];

function FeatureItem(props: { title: string; description: string; icon: React.ReactNode }) {
  const { title, description, icon } = props;
  const { t } = useTranslation();

  return (
    <div className="hf-subsection-item">
      {icon}
      <TextBlock
        title={t(title)}
        titleLevel="h3"
        description={t(description)}
        align="left"
        customizedCss="hf-text-block"
      />
    </div>
  );
}

export function Features() {
  const { t } = useTranslation();
  const screenSize = useAppSelector(state => state.common.screenSize);

  return (
    <div className="home-feature">
      <div className="section-title-button">
        <QText level="normal bold" color="dark">
          {t("LandingPage.Features")}
        </QText>
      </div>
      <TextBlock title={t("LandingPage.FeaturesTitle")} titleLevel="h2" align="center" customizedCss="hf-text-block" />

      <div className="hf-section">
        <div className="hf-subsection">
          {featuresItemMapLeft.map((item, index) => (
            <FeatureItem key={index} title={item.title} description={item.description} icon={item.icon} />
          ))}
        </div>

        <div className="hf-subsection">
          {featuresItemMapRight.map((item, index) => (
            <FeatureItem key={index} title={item.title} description={item.description} icon={item.icon} />
          ))}
        </div>
      </div>
    </div>
  );
}
