import { useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { QText } from "../../common/Fonts";
import { QLink } from "../../common/Links";

import { Loading } from "../../common/Loading";
import { LocationDropdown } from "../../form/fields/LocationDropdown";

import "./SinglePageView.css";
import { TermsOfService } from "./TermsOfService";
import { PrivacyPolicy } from "./PrivacyPolicy";
import { ContactUs } from "./ContactUs";

export function TestPageView() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(true);

  return (
    <div style={{ padding: "50px" }}>
      {/* Test for NationalityDropdown empty */}
      <LocationDropdown
        placeholder={{
          country: t("Application.BirthLocation.PlaceHolder.Country"),
          state: t("Application.BirthLocation.PlaceHolder.State"),
          city: t("Application.BirthLocation.PlaceHolder.City"),
        }}
        onLocationChange={(data: any) => {
          console.log("onLocationChange Data", data);
        }}
      />

      {/*  Test for NationalityDropdown with prefills */}
      <LocationDropdown
        placeholder={{
          country: t("Application.BirthLocation.PlaceHolder.Country"),
          state: t("Application.BirthLocation.PlaceHolder.State"),
          city: t("Application.BirthLocation.PlaceHolder.City"),
        }}
        prefillData={{
          country: "China",
          state: "Beijing",
        }}
        onLocationChange={(data: any) => {
          console.log("onLocationChange Data", data);
        }}
      />

      {/* Test for NationalityDropdown with only state and city */}
      <LocationDropdown
        placeholder={{
          state: t("Application.EntryLocation.PlaceHolder.State"),
          city: t("Application.EntryLocation.PlaceHolder.City"),
        }}
        prefillData={{
          country: "United States",
        }}
        countryIsShown={false}
        onLocationChange={(data: any) => {
          console.log("onLocationChange Data", data);
        }}
      />

      {/* Test for loading */}
      {/* {isLoading && <Loading text="Loading..." />} */}
    </div>
  );
}
