import {
  ApplicationCase,
  AsylumCaseProfile,
  UpdateApplicationCaseData,
} from "../model/apiModels";
import { ScreenSize } from "../model/commonModels";
import { updateApplicant } from "../reducers/formSlice";
import { PATH } from "../components/router/MainView";
import {
  LocationObject,
  LocationSelectOption,
} from "../components/form/fields/LocationDropdown";
import {
  City,
  Country,
  ICity,
  ICountry,
  IState,
  State,
} from "country-state-city";
import { ControlType, IFormOptions } from "../model/formFlowModels";
import { Regex } from "../consts/consts";

export const handleResize = (
  dispatch?: React.Dispatch<any>,
  callback?: any,
) => {
  const width = window.innerWidth;
  if (width < ScreenSize.xsmall) {
    callback && dispatch && dispatch(callback(ScreenSize.xsmall));
    return ScreenSize.xsmall;
  } else if (width < ScreenSize.small) {
    callback && dispatch && dispatch(callback(ScreenSize.small));
    return ScreenSize.small;
  } else if (width < ScreenSize.medium) {
    callback && dispatch && dispatch(callback(ScreenSize.medium));
    return ScreenSize.medium;
  } else {
    callback && dispatch && dispatch(callback(ScreenSize.large));
    return ScreenSize.large;
  }
};

export const equalsIgnoreCase = (str1: string, str2: string) => {
  return str1.toLowerCase() === str2.toLowerCase();
};

export const isAuthPath = (path: string) => {
  return (
    equalsIgnoreCase(path, PATH.SignIn) ||
    equalsIgnoreCase(path, PATH.SignUp) ||
    equalsIgnoreCase(path, PATH.ForgotPassword) ||
    equalsIgnoreCase(path, PATH.ConfirmCode)
  );
};

export const showFormNavigation = () => {
  return window.location.pathname.indexOf("/case") > -1;
};

export const getCaseId = (caseId: number) => {
  const encodedCaseId = encodeId(80000000 + caseId);
  return "#I" + encodedCaseId;
};

export function encodeId(id: number) {
  // Convert the id to a base36 string
  return id.toString(36);
}

export function decodeId(encodedId: string) {
  // Convert the base36 string back to an integer
  return parseInt(encodedId, 36);
}

export function getCaseDetailSection(
  caseDetails: AsylumCaseProfile,
  parentKey: string,
) {
  if (parentKey.indexOf(".") > -1) {
    const [parentKeyLevel1, parentKeyLevel2] = parentKey.split(".");
    return caseDetails[parentKeyLevel1][parentKeyLevel2];
  }
  return caseDetails[parentKey];
}

export function getFieldValue(
  caseDetails: AsylumCaseProfile,
  parentKey: string,
  key: string,
  options?: IFormOptions[] | string,
  format?: string,
) {
  if (!caseDetails) {
    console.info("Case profile is missing");
    return;
  }
  if (!key || !parentKey) {
    console.info(
      "Key or parentKey is missing, skip, this is for group control.",
    );
    return;
  }
  const caseDetailSection = getCaseDetailSection(caseDetails, parentKey);
  if (!caseDetailSection) {
    console.info(`Values of parent key ${parentKey} are missing`);
    return;
  }

  if (key?.indexOf(",") > -1) {
    const keys = key.split(",");
    if (options && Array.isArray(options)) {
      const keyValue = keys.map(k => caseDetailSection[k]).join(",");
      const option = options.find(option => option.keyValue === keyValue);
      return option?.value;
    } else if (format) {
      const regex = Regex[format]["FormatRegex"];
      const output = Regex[format]["FormatOutput"];
      const filterRegex = Regex[format]["FilterRegex"];
      if (!regex || !output) {
        console.error(`Regex or output is missing for format ${format}`);
        return "";
      }
      const raw = keys
        .map(k => caseDetailSection[k])
        .join("")
        .replace(filterRegex, "");
      return raw.replace(regex, output);
    } else {
      console.error("Options are missing for multi key field");
    }
  }

  return caseDetails[parentKey][key];
}

export function dispatchFormValue(
  dispatch: React.Dispatch<any>,
  parentKey: string,
  key: string,
  value: any,
) {
  if (parentKey === "applicant") {
    dispatch(
      updateApplicant({
        [key]: value,
      }),
    );
  }
}

export function getUpdateApplicationCaseData(
  applicationCase: ApplicationCase,
): UpdateApplicationCaseData {
  return {
    ...applicationCase,
    profile: applicationCase.profile,
  };
}

export async function downloadImage(presignedUrl: string, filename?: string) {
  try {
    const response = await fetch(presignedUrl);
    const image = await response.blob();
    return { url: URL.createObjectURL(image), filename: filename || "" };
  } catch (err) {
    console.error("Error downloading image:", err);
  }
}

export async function downloadDocument(presignedUrl: string, filename: string) {
  try {
    const response = await fetch(presignedUrl);
    const doc = await response.blob();
    return { document: doc, filename: filename };
  } catch (err) {
    console.error("Error downloading document:", err);
  }
}

export function parseCityAndCountryStr(
  cityAndCountry: string,
  locationObject?: LocationObject,
) {
  if (locationObject) {
    return {
      city: locationObject.city ?? "",
      state: locationObject.state ?? "",
      country: locationObject.country ?? "",
    };
  }
  if (!cityAndCountry) return { city: "", state: "", country: "" };
  const cityAndCountryArr = cityAndCountry.split(", ");
  if (cityAndCountryArr.length === 1)
    return { city: "", state: "", country: cityAndCountryArr[0] ?? "" };
  if (cityAndCountryArr.length === 2)
    return {
      city: cityAndCountryArr[0] ?? "",
      state: cityAndCountryArr[0] ?? "",
      country: cityAndCountryArr[1] ?? "",
    };
  return {
    city: cityAndCountryArr[0] ?? "",
    state: cityAndCountryArr[1] ?? "",
    country: cityAndCountryArr[2] ?? "",
  };
}

export function formatCityAndCountryStr(
  country?: string,
  state?: string,
  city?: string,
) {
  if (!city && !state && !country) return "";
  if (!city && !state) return country;
  if (!city) return `${state}, ${country}`;
  if (state === city) return `${city}, ${country}`;
  return `${city}, ${state}, ${country}`;
}

export interface LocationInfo {
  countries: ICountry[];
  countryPrefillOption?: LocationSelectOption;
  states?: IState[];
  statePrefillOption?: LocationSelectOption;
  cities?: ICity[];
  cityPrefillOption?: LocationSelectOption;
}
export function getPrefillLocationOptions(
  cityAndCountry: string,
  locationObject?: LocationObject,
): LocationInfo {
  const { country, state, city } = parseCityAndCountryStr(
    cityAndCountry,
    locationObject,
  );

  const allCountries = Country.getAllCountries();
  const result = { countries: allCountries };
  const prefillCountry = allCountries.find(
    c => c.name.toLocaleLowerCase() === country.toLocaleLowerCase(),
  );

  if (!prefillCountry) return result;
  const countryPrefillOption = {
    value: prefillCountry.name,
    label: `${prefillCountry.flag} ${prefillCountry.name}`,
    key: prefillCountry.isoCode,
  };
  result["countryPrefillOption"] = countryPrefillOption;

  if (!state) return result;
  const allStates = State.getStatesOfCountry(countryPrefillOption.key);
  result["states"] = allStates;
  const prefillState = allStates.find(
    s => s.name.toLocaleLowerCase() === state.toLocaleLowerCase(),
  );

  if (!prefillState) {
    // if we can't find the state, we will try to find the city, user might have entered city and country only
    allStates.forEach(s => {
      const cities = City.getCitiesOfState(countryPrefillOption.key, s.isoCode);
      const prefillCity = cities.find(
        c => c.name.toLocaleLowerCase() === state.toLocaleLowerCase(),
      );
      if (prefillCity) {
        result["statePrefillOption"] = {
          value: s.name,
          label: s.name,
          key: s.isoCode,
        };
        result["cities"] = cities;
        result["cityPrefillOption"] = {
          value: prefillCity.name,
          label: prefillCity.name,
        };
        return result;
      }
    });
    return result;
  }

  const statePrefillOption = {
    value: prefillState.name,
    label: prefillState.name,
    key: prefillState.isoCode,
  };
  result["statePrefillOption"] = statePrefillOption;

  if (!city) return result;
  const allCities = City.getCitiesOfState(
    countryPrefillOption.key,
    statePrefillOption.key,
  );
  result["cities"] = allCities;
  const prefillCity = allCities.find(
    c => c.name.toLocaleLowerCase() === city.toLocaleLowerCase(),
  );

  if (!prefillCity) return result;
  const cityPrefillOption = {
    value: prefillCity.name,
    label: prefillCity.name,
  };
  result["cityPrefillOption"] = cityPrefillOption;

  return result;
}
