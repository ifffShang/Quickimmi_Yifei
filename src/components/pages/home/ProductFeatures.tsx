import { useTranslation } from "react-i18next";
import {
  AiComplete,
  AiTranslate,
  ManAndComputer,
} from "../../icons/ProductFeatures";
import "./ProductFeatures.css";
import { TextBlock } from "./Common";

function SupportedImmigrationTypes() {
  return <div className="feature-detail">Asylum, niw, h1b, b1</div>;
}

export function ProductFeatures() {
  const { t } = useTranslation();
  return (
    <div className="product-features">
      <TextBlock
        title={t("LandingPage.AiFilterType")}
        titleLevel="h2"
        description={t("LandingPage.AiFilterTypeDescription")}
        align="center"
      />
      <div className="pf-section">
        <ManAndComputer />
        <SupportedImmigrationTypes />
      </div>
      <div className="pf-section">
        <TextBlock
          title={t("LandingPage.AiComplete")}
          titleLevel="h2"
          description={t("LandingPage.AiCompleteDescription")}
          align="left"
        />
        <AiComplete />
      </div>
      <div className="pf-section">
        <AiTranslate />
        <TextBlock
          title={t("LandingPage.AiTranslate")}
          titleLevel="h2"
          description={t("LandingPage.AiTranslateDescription")}
          align="right"
        />
      </div>
    </div>
  );
}
