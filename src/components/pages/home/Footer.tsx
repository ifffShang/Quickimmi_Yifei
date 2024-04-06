import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { QLink } from "../../common/Links";
import { QuickImmiLight } from "../../icons/Logo";
import "./Footer.css";

export function Footer() {
  const { t } = useTranslation();

  return (
    <div className="footer">
      <div className="footer-brand">
        <QuickImmiLight />
        <div className="footer-logo-text">{t("LandingPage.BrandText")}</div>
      </div>
      <FooterLinks />
    </div>
  );
}

function FooterLinks() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="footer-links">
      <div>
        <h3>{t("AboutUs")}</h3>
        <ul>
          <li>
            <QLink
              color="white"
              onClick={() => {
                const container = document?.getElementById("home-container");
                if (container) container.scrollTop = 0;
              }}>
              {t("Home")}
            </QLink>
          </li>
          <li>
            <QLink color="white" onClick={() => navigate("/contactus")}>
              {t("AboutQuickimmi")}
            </QLink>
          </li>
        </ul>
      </div>
      <div>
        <h3>{t("Compare")}</h3>
        <ul>
          <li>
            <QLink color="white" onClick={() => open("https://www.uscis.gov")}>
              {t("ImmigrationWebsite")}
            </QLink>
          </li>
        </ul>
      </div>
      <div>
        <h3>{t("Policies")}</h3>
        <ul>
          <li>
            <QLink color="white" onClick={() => navigate("/termsofservice")}>
              {t("TermsService")}
            </QLink>
          </li>
          <li>
            <QLink color="white" onClick={() => navigate("./privacypolicy")}>
              {t("PrivacyPolicy")}
            </QLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
