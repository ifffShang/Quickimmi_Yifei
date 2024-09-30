import React from "react";
import { Card, Collapse } from "antd";
import type { CollapseProps } from "antd";
import { useAppSelector } from "../../../app/hooks";
import { AsylumCaseProfile } from "../../../model/apiModels";
import { useTranslation } from "react-i18next";
import "./FormSummary.css";

export function FormSummary() {
  const { t } = useTranslation();
  const asylumProfile: AsylumCaseProfile | undefined = useAppSelector(
    state => state.form.applicationCase.asylumProfile,
  );

  if (!asylumProfile) {
    return <div>{t("No profile information available")}</div>;
  }

  const renderCards = (data: Record<string, any>) => {
    return Object.entries(data).map(([key, value]) => (
      <Card key={key} type="inner" title={key}>
        {typeof value === "object" && value !== null ? renderCards(value) : value?.toString()}
      </Card>
    ));
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: t("ApplicantInformation"),
      children: renderCards(asylumProfile.applicant),
    },
    {
      key: "2",
      label: t("FamilyInformation"),
      children: renderCards(asylumProfile.family),
    },
    {
      key: "3",
      label: t("BackgroundInformation"),
      children: renderCards(asylumProfile.background),
    },
    {
      key: "4",
      label: t("ApplicationDetails"),
      children: renderCards(asylumProfile.applicationDetails),
    },
    {
      key: "5",
      label: t("Signature"),
      children: renderCards(asylumProfile.signature),
    },
    {
      key: "6",
      label: t("Declaration"),
      children: renderCards(asylumProfile.declaration),
    },
  ];

  return <Collapse accordion items={items} />;
}
