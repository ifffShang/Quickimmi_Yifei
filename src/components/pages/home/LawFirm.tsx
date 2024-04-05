import { useTranslation } from "react-i18next";
import { Lawyer } from "../../icons/LawFirm";
import "./LawFirm.css";

export function LawFirm() {
  const { t } = useTranslation();

  return (
    <div className="lawfirm">
      <div className="lawfirm-text">{t("LandingPage.CooperativeLawFirm")}</div>
      <img src="/img/lawfirm.png" />
      <div className="lawfirm-lawyer">
        <Lawyer />
      </div>
    </div>
  );
}
