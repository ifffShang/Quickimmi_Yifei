import { useTranslation } from "react-i18next";
import {
  LawyerReview,
  ProgressNotification,
} from "../../icons/SubmitForReview";
import { TextBlock } from "./Common";
import "./SubmitForReview.css";

export function SubmitForReview() {
  const { t } = useTranslation();

  return (
    <div className="submit-review">
      <TextBlock
        title={t("LandingPage.SubmitForReviewTitle")}
        titleLevel="h2"
        align="center"
        customizedCss="submit-review-title"
      />
      <div className="submit-review-content">
        <div>
          <TextBlock
            title={t("LandingPage.SubmitForReviewLawyerReview")}
            titleLevel="h3"
            description={t(
              "LandingPage.SubmitForReviewLawyerReviewDescription",
            )}
            align="center"
            customizedCss="submit-review-subtitle"
          />
          <LawyerReview />
        </div>
        <div>
          <TextBlock
            title={t("LandingPage.SubmitForReviewNotification")}
            titleLevel="h3"
            description={t(
              "LandingPage.SubmitForReviewNotificationDescription",
            )}
            align="center"
            customizedCss="submit-review-subtitle"
          />
          <ProgressNotification />
        </div>
      </div>
    </div>
  );
}
