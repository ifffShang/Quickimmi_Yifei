import { LeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { QText } from "../../common/Fonts";
import { QLink } from "../../common/Links";
import "./SinglePageView.css";
import { TermsOfService } from "./TermsOfService";
import { PrivacyPolicy } from "./PrivacyPolicy";
import { ContactUs } from "./ContactUs";

export interface SinglePageViewProps {
  type: "termsofservice" | "privacypolicy" | "contactus";
}

export function SinglePageView(props: SinglePageViewProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  let singlePageComponent = null;
  if (props.type === "termsofservice") {
    singlePageComponent = <TermsOfService />;
  } else if (props.type === "privacypolicy") {
    singlePageComponent = <PrivacyPolicy />;
  } else if (props.type === "contactus") {
    singlePageComponent = <ContactUs />;
  }

  return (
    <div className="single-page-view">
      <QLink onClick={() => navigate("/")}>
        <div className="single-page-return">
          <LeftOutlined />
          <QText>{t("SinglePage.ReturnHome")}</QText>
        </div>
      </QLink>
      <div className="single-page-content">{singlePageComponent}</div>
    </div>
  );
}
