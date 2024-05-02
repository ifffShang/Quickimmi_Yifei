import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { LocationDropdown } from "../../form/fields/LocationDropdown";

import "./SinglePageView.css";

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
        onLocationChange={(data: any) => {
          console.log("onLocationChange Data", data);
        }}
      />

      {/* Test for loading */}
      {/* {isLoading && <Loading text="Loading..." />} */}
    </div>
  );
}
