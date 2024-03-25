import { Button, Input, Space } from "antd";
import "./SignUpEntry.css";
import { Trans, useTranslation } from "react-i18next";
import { Stroke } from "../../icons/Stroke";

export function SignUpEntry() {
  const { t } = useTranslation();
  return (
    <div className="signup-entry">
      <h2 className="signup-entry-header">
        <div className="signup-entry-text">
          <Trans>{t("LandingPage.SignupEntryTitle")}</Trans>
          <Stroke />
        </div>
      </h2>
      <Space.Compact style={{ maxWidth: "300px" }}>
        <Input
          className="signup-entry-input"
          placeholder="Enter your email to try"
        />
        <Button className="signup-entry-button" type="default">
          Sign up
        </Button>
      </Space.Compact>
    </div>
  );
}
