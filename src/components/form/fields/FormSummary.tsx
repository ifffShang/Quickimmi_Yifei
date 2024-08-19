import React from "react";
import { Card, Collapse } from "antd";
import type { CollapseProps } from "antd";
import { useAppSelector } from "../../../app/hooks";
import { AsylumCaseProfile } from "../../../model/apiModels";
import { useTranslation } from "react-i18next";

export function FormSummary() {
  const { t } = useTranslation();
  const profile: AsylumCaseProfile | undefined = useAppSelector(state => state.form.applicationCase.profile);

  if (!profile) {
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
      children: renderCards(profile.applicant),
    },
    {
      key: "2",
      label: t("FamilyInformation"),
      children: renderCards(profile.family),
    },
    {
      key: "3",
      label: t("BackgroundInformation"),
      children: renderCards(profile.background),
    },
    {
      key: "4",
      label: t("ApplicationDetails"),
      children: renderCards(profile.applicationDetails),
    },
    {
      key: "5",
      label: t("Signature"),
      children: renderCards(profile.signature),
    },
    {
      key: "6",
      label: t("Declaration"),
      children: renderCards(profile.declaration),
    },
  ];

  return <Collapse accordion items={items} />;
}
