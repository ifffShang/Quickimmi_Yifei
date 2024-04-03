import { Button } from "antd";
import { useTranslation } from "react-i18next";
import ReactPlayer from "react-player";
import { useAppSelector } from "../../../app/hooks";
import { Buildings } from "../../icons/Buildings";
import { FastTrack } from "../../icons/FastTrack";
import { FastTrackCn } from "../../icons/FastTrackCn";
import { StatueOfLiberty } from "../../icons/StatueOfLiberty";
import { Footer } from "./Footer";
import { Highlights } from "./Highlights";
import "./Home.css";
import { LawFirm } from "./LawFirm";
import { PriceChart } from "./PriceChart";
import { ProductFeatures } from "./ProductFeatures";
import { SignUpEntry } from "./SignUpEntry";
import { SubmitForReview } from "./SubmitForReview";

export function Home() {
  const { t } = useTranslation();
  const selectedLanguage = useAppSelector(
    state => state.common.selectedLanguage,
  );

  return (
    <div className="home-container">
      <div className="home-section center">
        {selectedLanguage === "cn" ? (
          <div
            className="home-image landing-page-title"
            aria-label="Fast-Track Your American Dream with AI">
            <FastTrackCn />
          </div>
        ) : (
          <div
            className={"home-image landing-page-title"}
            aria-label="Fast-Track Your American Dream with AI">
            <FastTrack />
          </div>
        )}
        {/* <div className="home-text fast-track-description">
          <Trans>
            <div>{t("LandingPage.FastTrackDescription1")}</div>
            <div>{t("LandingPage.FastTrackDescription2")}</div>
          </Trans>
        </div> */}
        <a
          href="https://forms.gle/7i85vwVHMbsBSe3a8"
          target="_blank"
          rel="noopener noreferrer">
          <Button type="primary" size="large">
            {t("LandingPage.JoinWaitingList")}
          </Button>
        </a>
        <div className="home-video">
          <ReactPlayer
            className="home-video-player"
            width="100%"
            height="100%"
            url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
            playing={true}
            muted={true}
            loop={true}
            controls={false}
            allowFullScreen={false}
          />
        </div>
      </div>

      <div className="home-section background-image border-bottom-2px">
        <div className="home-image buildings">
          <Buildings />
        </div>
        <div className="home-image liberty">
          <StatueOfLiberty />
        </div>
        <div className="home-section-background" />
      </div>

      <div className="home-section home-highlights">
        <Highlights />
      </div>

      <div className="home-section center">
        <ProductFeatures />
      </div>

      <div className="home-section center">
        <PriceChart />
      </div>

      <div className="home-section center">
        <SubmitForReview />
      </div>

      <div className="home-section center">
        <LawFirm />
      </div>

      <div className="home-section center">
        <SignUpEntry />
      </div>

      <div className="home-section center">
        <Footer />
      </div>
    </div>
  );
}
