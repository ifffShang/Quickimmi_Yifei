import { ManAndComputer } from "../../icons/ProductFeatures";
import "./Ads.css";
import { useTranslation } from "react-i18next";

export function Ads() {
  const { t } = useTranslation();

  return (
    <div className="ads">
      <ManAndComputer />
      <div>
        <h2>{t("LoginAdsTitle")}</h2>
        <p>{t("LoginAdsContent")}</p>
      </div>
    </div>
  );
}
