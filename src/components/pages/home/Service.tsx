import React from "react";
import { useTranslation } from "react-i18next";
import { FamilyImmigration, EmployeeImmigration, HumanitarianImmigration } from "../../icons/ImmigrationTypes";
import { FormAndPlanet } from "../../icons/FormAndPlanet";
import { QText } from "../../common/Fonts";
import { TextBlock } from "./Common";
import "./Service.css";

const ServiceItemMap = [
  {
    title: "LandingPage.FamilyImmigration",
    description: "LandingPage.FamilyImmigrationDescription",
    icon: <FamilyImmigration />,
  },
  {
    title: "LandingPage.EmploymentImmigration",
    description: "LandingPage.EmploymentImmigrationDescription",
    icon: <EmployeeImmigration />,
  },
  {
    title: "LandingPage.HumanitarianImmigration",
    description: "LandingPage.HumanitarianImmigrationDescription",
    icon: <HumanitarianImmigration />,
  },
];

function ServiceItem(props: { title: string; description: string; icon: React.ReactNode }) {
  const { title, description, icon } = props;
  const { t } = useTranslation();

  return (
    <div className="hs-subsection-item">
      {icon}
      <TextBlock
        title={t(title)}
        titleLevel="h3"
        description={t(description)}
        align="left"
        customizedCss="hs-text-block"
      />
    </div>
  );
}

export function Services() {
  const { t } = useTranslation();

  return (
    <div className="home-service">
      <div className="section-title-button">
        <QText level="normal bold" color="dark">
          {t("LandingPage.Service")}
        </QText>
      </div>
      <TextBlock title={t("LandingPage.CaseExpertise")} titleLevel="h2" align="center" customizedCss="hs-text-block" />

      <div className="hs-section">
        <FormAndPlanet />
        <div className="hs-subsection">
          {ServiceItemMap.map((item, index) => (
            <ServiceItem key={index} title={item.title} description={item.description} icon={item.icon} />
          ))}
        </div>
      </div>
    </div>
  );
}
