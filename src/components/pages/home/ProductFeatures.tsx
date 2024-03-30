import { useTranslation } from "react-i18next";
import {
  AiComplete,
  AiTranslate,
  ManAndComputer,
} from "../../icons/ProductFeatures";
import "./ProductFeatures.css";
import { TextBlock } from "./Common";
import { useAppSelector } from "../../../app/hooks";
import { ScreenSize } from "../../../model/Models";

function SupportedImmigrationTypes() {
  const { t } = useTranslation();
  return (
    <div className="supported-immigration">
      <div className="supported-immigration-title">
        {t("LandingPage.SupportedImmigrationTypes")}
      </div>
      <div className="supported-immigration-types">
        <div>ASYLUM</div>
        <div>NIW</div>
        <div>H1B</div>
        <div>B1</div>
      </div>
    </div>
  );
}

export function ProductFeatures() {
  const { t } = useTranslation();
  const screenSize = useAppSelector(state => state.common.screenSize);

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
        {/* <SupportedImmigrationTypes /> */}
      </div>
      <div className="pf-section">
        {screenSize === ScreenSize.small ? (
          <>
            <TextBlock
              title={t("LandingPage.AiTranslate")}
              titleLevel="h2"
              description={t("LandingPage.AiTranslateDescription")}
              align="center"
            />
            <AiTranslate />
          </>
        ) : (
          <>
            <AiTranslate />
            <TextBlock
              title={t("LandingPage.AiTranslate")}
              titleLevel="h2"
              description={t("LandingPage.AiTranslateDescription")}
              align="right"
            />
          </>
        )}
      </div>
      <div className="pf-section">
        <TextBlock
          title={t("LandingPage.AiComplete")}
          titleLevel="h2"
          description={t("LandingPage.AiCompleteDescription")}
          align={screenSize === ScreenSize.small ? "center" : "left"}
        />
        <AiComplete />
      </div>
    </div>
  );
}
