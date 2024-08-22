import React from "react";
import { useTranslation } from "react-i18next";
import { FamilyImmigration, EmployeeImmigration, HumanitarianImmigration } from "../../icons/ImmigrationTypes";
import { AiTranslate } from "../../icons/ProductFeatures";
import { QText } from "../../common/Fonts";
import { TextBlock } from "./Common";
import "./DataShowCase.css";

export function DataShowCase() {
    const { t } = useTranslation();

    return (
        <div className="home-data-showcase">
            <TextBlock
                title={t("LandingPage.GrowYourBusiness")}
                titleLevel="h2"
                align="left"
                customizedCss="hd-title"
            />

            <div className="hd-section">
                <TextBlock
                    title="80%"
                    titleLevel="h2"
                    align="left"
                    description={t("LandingPage.ReduceCasePreparationTime")}
                    customizedCss="hd-text-block"
                />
                <TextBlock
                    title="3X"
                    titleLevel="h2"
                    align="left"
                    description={t("LandingPage.IncreaseCaseloadCapacity")}
                    customizedCss="hd-text-block"
                />
                <TextBlock
                    title="100%"
                    titleLevel="h2"
                    align="left"
                    description={t("LandingPage.EnhanceDataProtection")}
                    customizedCss="hd-text-block"
                />
            </div>
        </div>
    )

}