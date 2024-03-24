import { Lawyer } from "../../icons/LawFirm";
import {
  LawyerReview,
  ProgressNotification,
} from "../../icons/SubmitForReview";
import { TextBlock } from "./Common";
import image from "./img/one.jpg";
import "./SubmitForReview.css";

export function SubmitForReview() {
  return (
    <div className="submit-review">
      <TextBlock
        title="Submitting for review is more worry-free"
        titleLevel="h2"
        align="center"
        customizedCss="submit-review-title"
      />
      <div className="submit-review-content">
        <div>
          <TextBlock
            title="Immigration lawyer review"
            titleLevel="h3"
            description="xxxProfessional immigration lawyers review documents and assist with submission"
            align="center"
            customizedCss="submit-review-subtitle"
          />
          <LawyerReview />
        </div>
        <div>
          <TextBlock
            title="Progress synchronization notification"
            titleLevel="h3"
            description="Supplementary information, interview and other synchronous notifications, not to miss any process"
            align="center"
            customizedCss="submit-review-subtitle"
          />
          <ProgressNotification />
        </div>
      </div>
    </div>
  );
}
