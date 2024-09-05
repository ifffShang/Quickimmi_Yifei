import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { ArrowRightWhite } from "../../icons/ArrowDown";
import { useTranslation } from "react-i18next";
import ReactPlayer from "react-player";
import { useAppSelector } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import { Buildings } from "../../icons/Buildings";
import { Empower } from "../../icons/Empower";
import { StatueOfLiberty } from "../../icons/StatueOfLiberty";
import { Footer } from "./Footer";
import { Highlights } from "./Highlights";
import { LawFirm } from "./LawFirm";
import { PriceChart } from "./PriceChart";
import { Solutions } from "./Solutions";
import { SignUpEntry } from "./SignUpEntry";
import { SubmitForReview } from "./SubmitForReview";
import { Features } from "./Features";
import { Services } from "./Service";
import { DataShowCase } from "./DataShowCase";
import "./Home.css";

export function Home() {
  const { t } = useTranslation();
  const selectedLanguage = useAppSelector(state => state.common.selectedLanguage);
  const navigate = useNavigate();

  return (
    <div className="home-container" id="home-container">
      <div className="top-section">
        <div className="home-section center first">
          {selectedLanguage === "cn" ? (
            <div className="home-image landing-page-title" aria-label="Fast-Track Your American Dream with AI">
              {/* <h2 className="home-heading">Empower You Immigration Legal Professionals</h2>
              <h2 className="home-heading-ai">With AI</h2> */}
              <Empower />
            </div>
          ) : (
            <div className="home-image landing-page-title" aria-label="Fast-Track Your American Dream with AI">
              <Empower />
            </div>
          )}
          <Button
            type="primary"
            size="large"
            icon={<ArrowRightOutlined />}
            onClick={() => navigate("/signin")}
            className="first-home-button"
          >
            {t("LandingPage.TryForFree")}
          </Button>
        </div>

        <div className="home-section background-image border-bottom-2px">
          <div className="home-image buildings">
            <Buildings />
          </div>
          <div className="home-image liberty">
            <StatueOfLiberty />
          </div>
        </div>

        <div className="home-video">
          <div className="home-video-player">
            <ReactPlayer
              width="100%"
              height="100%"
              url="https://youtu.be/vYE1ukYjlNg?si=6alGE8dnzsN2uATd"
              loop={true}
              config={{
                youtube: {
                  playerVars: {
                    showinfo: 0,
                    controls: 1,
                    modestbranding: 1,
                    loop: 1,
                    mute: 1,
                    autoplay: 1,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* <div className="home-section home-highlights">
        <Highlights />
      </div> */}

      <div className="home-section center" id="solutions">
        <Solutions />
      </div>

      <div className="home-section center" id="features">
        <Features />
      </div>

      <div className="home-section center" id="services">
        <Services />
      </div>

      <div className="home-section center">
        <DataShowCase />
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
