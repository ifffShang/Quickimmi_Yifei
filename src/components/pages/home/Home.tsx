import { useTranslation } from "react-i18next";
import { Buildings } from "../../icons/Buildings";
import { FastTrack } from "../../icons/FastTrack";
import { StatueOfLiberty } from "../../icons/StatueOfLiberty";
import { useAppSelector } from "../../../app/hooks";
import "./Home.css";
import { LandingPageTitleCn } from "../../icons/LandingPageTitleCn";
import { Button } from "antd";

export function Home() {
  const { t } = useTranslation();
  const selectedLanguage = useAppSelector(
    state => state.common.selectedLanguage,
  );

  let fastTrackCss = "fasttrack";
  if (selectedLanguage === "cn") {
    fastTrackCss = "fasttrack-cn";
  }

  return (
    <div className="home-container">
      <div className="home-section center">
        <div className={`home-image ${fastTrackCss}`}>
          <FastTrack />
        </div>
        {selectedLanguage === "cn" && (
          <div className="home-image landing-page-title">
            <LandingPageTitleCn />
          </div>
        )}
        <div className="home-text fast-track-description">
          <div>{t("LandingPage.FastTrackDescription1")}</div>
          <div>{t("LandingPage.FastTrackDescription2")}</div>
        </div>
        <a
          href="https://forms.gle/7i85vwVHMbsBSe3a8"
          target="_blank"
          rel="noopener noreferrer">
          <Button type="primary" size="large">
            {t("LandingPage.JoinWaitingList")}
          </Button>
        </a>
      </div>
      <div className="home-section space-between border-bottom-2px">
        <div className="home-image buildings">
          <Buildings />
        </div>
        <div className="home-image liberty">
          <StatueOfLiberty />
        </div>
      </div>
    </div>
  );
}
