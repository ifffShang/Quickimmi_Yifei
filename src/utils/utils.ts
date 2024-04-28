import {
  ApplicationCase,
  AsylumCaseProfile,
  FieldKey,
  ParentFieldKey,
  UpdateApplicationCaseData,
} from "../model/apiModels";
import { ScreenSize } from "../model/models";
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
import { IFormOptions } from "../model/formModels";

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

export function getFieldValue(
  caseDetails: AsylumCaseProfile,
  parentKey: ParentFieldKey,
  key: FieldKey,
  options?: IFormOptions[] | string,
) {
  if (!caseDetails) {
    console.info("Case profile is missing");
    return;
  }
  const parentValues = caseDetails[parentKey];
  if (!parentValues) {
    console.error(`Values of parent key ${parentKey} are missing`);
    return;
  }

  if (key?.indexOf(",") > -1) {
    const keys = key.split(",");
    const keyValue = keys.map(k => caseDetails[parentKey][k]).join(",");
    if (options && Array.isArray(options)) {
      const option = options.find(option => option.keyValue === keyValue);
      return option?.value;
    } else {
      console.error("Options are missing for multi key field");
    }
  }

  return caseDetails[parentKey][key];
}

export function dispatchFormValue(
  dispatch: React.Dispatch<any>,
  parentKey: ParentFieldKey,
  key: FieldKey,
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

export async function downloadImage(presignedUrl: string) {
  try {
    const response = await fetch(presignedUrl);
    const image = await response.blob();
    return URL.createObjectURL(image);
  } catch (err) {
    console.error("Error downloading image:", err);
    return "";
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
  if (!city || !state || !country) return "";
  if (!city || !state) return country;
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
  const prefillCountry = allCountries.find(c => c.name === country);

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
  const prefillState = allStates.find(s => s.name === state);

  if (!prefillState) return result;
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
  const prefillCity = allCities.find(c => c.name === city);

  if (!prefillCity) return result;
  const cityPrefillOption = {
    value: prefillCity.name,
    label: prefillCity.name,
  };
  result["cityPrefillOption"] = cityPrefillOption;

  return result;
}
