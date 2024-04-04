import { useTranslation } from "react-i18next";
import { QuickImmiLight } from "../../icons/Logo";
import "./Footer.css";

export function Footer() {
  const { t } = useTranslation();

  return (
    <div className="footer">
      <div className="footer-brand">
        <QuickImmiLight />
        <div className="footer-logo-text">
          Fast-Track Your American Dream with AI
        </div>
      </div>
      <FooterLinks />
    </div>
  );
}

function FooterLinks() {
  const { t } = useTranslation();

  return (
    <div className="footer-links">
      <div>
        <h3>{t("AboutUs")}</h3>
        <ul>
          <li>{t("Home")}</li>
          <li>{t("AboutQuickimmi")}</li>
          <li>{t("Pricing")}</li>
        </ul>
      </div>
      <div>
        <h3>{t("Compare")}</h3>
        <ul>
          <li>{t("ImmigrationWebsite")}</li>
        </ul>
      </div>
      <div>
        <h3>{t("Policies")}</h3>
        <ul>
          <li>{t("TermsService")}</li>
          <li>{t("PrivacyPolicy")}</li>
        </ul>
      </div>
    </div>
  );
}
