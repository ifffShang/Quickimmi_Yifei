import { Button, Input, Space } from "antd";
import "./SignUpEntry.css";
import { Trans, useTranslation } from "react-i18next";

export function SignUpEntry() {
  const { t } = useTranslation();
  return (
    <div className="signup-entry">
      <h2 className="signup-entry-header">
        <div className="signup-entry-text">{t("LandingPage.SignupEntryTitle")}</div>
      </h2>
      <a href="https://forms.gle/7i85vwVHMbsBSe3a8" target="_blank" rel="noopener noreferrer">
        <Button type="default" size="large">
          {t("LandingPage.JoinWaitingList")}
        </Button>
      </a>
      {/* <Space.Compact style={{ maxWidth: "300px" }}>
        <Input
          className="signup-entry-input"
          placeholder={t("LandingPage.EnterEmail")}
        />
        <Button className="signup-entry-button" type="default">
          {t("SignUp")}
        </Button>
      </Space.Compact> */}
    </div>
  );
}
