import React from "react";
import {
  AiAssist,
  ProfessionalLaywer,
  TransparentCost,
} from "../../icons/Highlights";
import { useTranslation } from "react-i18next";
import "./Highlights.css";

export interface HighlightProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function Highlight({ icon, title, description }: HighlightProps) {
  return (
    <div className="highlight">
      <div className="highlight-icon">{icon}</div>
      <div className="highlight-title">{title}</div>
      <div className="highlight-description">{description}</div>
    </div>
  );
}

export function Highlights() {
  const { t } = useTranslation();
  return (
    <div className="highlights">
      <Highlight
        icon={<AiAssist />}
        title={t("LandingPage.AiAssist")}
        description={t("LandingPage.AiAssistDescription")}
      />
      <Highlight
        icon={<ProfessionalLaywer />}
        title={t("LandingPage.ProfessionalLawyer")}
        description={t("LandingPage.ProfessionalLawyerDescription")}
      />
      <Highlight
        icon={<TransparentCost />}
        title={t("LandingPage.TransparentPrice")}
        description={t("LandingPage.TransparentPriceDescription")}
      />
    </div>
  );
}
