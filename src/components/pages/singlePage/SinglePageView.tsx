import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { QReturnLink } from "../../common/Links";
import { ContactUs } from "./ContactUs";
import { PrivacyPolicy } from "./PrivacyPolicy";
import "./SinglePageView.css";
import { TermsOfService } from "./TermsOfService";

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
      <QReturnLink
        onClick={() => navigate("/")}
        text={t("SinglePage.ReturnHome")}
        margin="20px 40px 0"
      />
      <div className="single-page-content">{singlePageComponent}</div>
    </div>
  );
}
