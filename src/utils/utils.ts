import { City, Country, ICity, ICountry, IState, State } from "country-state-city";
import _ from "lodash";
import { LocationObject, LocationSelectOption } from "../components/form/fields/LocationDropdown";
import { PATH } from "../components/router/MainView";
import { Regex } from "../consts/consts";
import {
  ApplicationCase,
  AsylumCaseProfile,
  AsylumCaseProfileOptional,
  Progress,
  UpdateApplicationCaseData,
} from "../model/apiModels";
import { Identity, KeyValues, ScreenSize } from "../model/commonModels";
import { ControlType, IFormOptions } from "../model/formFlowModels";
import { ArrayFields, updateCaseFields } from "../reducers/formSlice";

export const handleResize = (dispatch?: React.Dispatch<any>, callback?: any) => {
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

export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
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

export function getCaseDetailValue(caseDetails: AsylumCaseProfile, key: string, fieldIndex?: number) {
  if (key.indexOf(".") > -1) {
    const keys = key.split(".");
    let result: any = caseDetails;
    for (const keyEntry of keys) {
      if (keyEntry.indexOf("[]") > -1) {
        // handle array
        if (keyEntry.indexOf("[]") === -1 || typeof fieldIndex !== "number") {
          console.error(
            `[getCaseDetailValue] Field index is missing for array field. Key: ${keyEntry} fieldIndex: ${fieldIndex}`,
          );
          return null;
        }
        const realKeyEntry = keyEntry.replace("[]", "");
        if (result && result[realKeyEntry] && Array.isArray(result[realKeyEntry])) {
          result = result[realKeyEntry][fieldIndex];
        } else {
          result = null;
          console.error("Result should be an array for key: ", keyEntry);
        }
        continue;
      }
      if (result === 0) return 0;
      if (result === false) return "false";
      if (!result) return null;
      result = result[keyEntry];
    }
    if (result === true) return "true";
    return result;
  }
  return caseDetails[key];
}

export function hasFormKey(control: ControlType) {
  return (
    control !== "label" &&
    control !== "divider" &&
    control !== "section" &&
    control !== "removable_section" &&
    control !== "component_mailing_same_as_residential" &&
    control !== "component_list_documents" &&
    control !== "component_list_merged_documents" &&
    control !== "component_view_application_form"
  );
}

export function getFieldValue(
  caseDetails: AsylumCaseProfile,
  key: string,
  control: ControlType,
  options?: IFormOptions[] | string,
  format?: string,
  fieldIndex?: number,
): any {
  // Sanity Check
  if (control === "group") {
    return;
  }

  if (!caseDetails) {
    console.info("Case profile is missing");
    return;
  }
  if (!key) {
    if (hasFormKey(control)) {
      console.error("Key is missing for control type: ", control);
    }
    return;
  }

  /*
   * count-array pair
   * Example:
   * 1, applicant.childrenCnt-family.children
   * 2, count-background.usAddressHistoriesPast5Years
   */
  if (key.indexOf("-") > -1) {
    // Example: countKey: applicant.childrenCnt, arrKey: family.children
    const [countKey, arrKey] = key.split("-");
    // Example: Children[fieldIndex]
    const arr = getCaseDetailValue(caseDetails, arrKey, fieldIndex);

    if (countKey !== "count") {
      const count = getCaseDetailValue(caseDetails, countKey, fieldIndex);
      return { countKey, count, arrKey, arr };
    } // else Example: count-background.usAddressHistoriesPast5Years
    return { arrKey, arr };
  }

  /*
   * Example:
   * applicant.immigrationCourtProceedingACheckbox,applicant.immigrationCourtProceedingBCheckbox,applicant.immigrationCourtProceedingCCheckbox
   */
  if (key?.indexOf(",") > -1) {
    /*
     * Example keys:
     * applicant.immigrationCourtProceedingACheckbox
     * applicant.immigrationCourtProceedingBCheckbox
     * applicant.immigrationCourtProceedingCCheckbox
     */
    const keys = key.split(",");

    if (options && Array.isArray(options)) {
      // Handle radio, checkbox, dropdown with multiple value, for example, keyValues = ["true","false","true"]
      const keyValues = keys.map(k => getCaseDetailValue(caseDetails, k, fieldIndex));
      const tmpOptions = Array(keyValues.length).fill("false");
      // Check if keyValues itself is an option
      const keyValueList = [keyValues.join(",")];
      // Generate all possible combinations of key values to match with options, each options only has one true value
      // Example: ["true","false","true"] => ["true","false","false"], ["false","false","true"]
      keyValues.forEach((k, i) => {
        if (k === "true") {
          tmpOptions[i] = "true";
          keyValueList.push(tmpOptions.join(","));
        }
        tmpOptions[i] = "false";
      });
      // Find the selected options
      const selectedOptions = options.filter(option => keyValueList.indexOf(option.keyValue) > -1);
      if (selectedOptions.length === 1) {
        return selectedOptions[0].value;
      } else if (selectedOptions.length > 1) {
        return selectedOptions.map(option => option.value);
      } else {
        return;
      }
    } else if (format) {
      // Only handle phone number
      const regex = Regex[format]["FormatRegex"];
      const output = Regex[format]["FormatOutput"];
      const filterRegex = Regex[format]["FilterRegex"];
      if (!regex || !output) {
        console.error(`Regex or output is missing for format ${format}`);
        return "";
      }
      const raw = keys
        .map(k => getCaseDetailValue(caseDetails, k, fieldIndex))
        .join("")
        .replace(filterRegex, "");
      return raw.replace(regex, output);
    } else {
      console.error("Options are missing for multi key field");
    }
  }

  // Other cases
  return getCaseDetailValue(caseDetails, key, fieldIndex);
}

function createNestedObject(keys: string[], value: any, fieldIndex?: number) {
  return keys.reduceRight((result, key, i) => {
    if (key.indexOf("[]") > -1) {
      if (typeof fieldIndex !== "number") {
        console.error(
          `[createNestedObject] Field index is missing for array field. Key: ${key} fieldIndex: ${fieldIndex}`,
        );
        return null;
      }
      const subKey = key.replace("[]", "");
      const array: any[] = [];
      array[fieldIndex] = result;
      return { [subKey]: array };
    }
    return { [key]: result };
  }, value);
}

export function dispatchFormValue(dispatch: React.Dispatch<any>, keyValues: KeyValues, fieldIndex?: number) {
  let caseFieldsToUpdate: any = {};
  for (const [key, value] of Object.entries(keyValues)) {
    let valueUsed = value;
    if (value === false) valueUsed = "false";
    if (value === true) valueUsed = "true";
    const keys = key.split(".");
    if (keys.length === 1) {
      let subKey = keys[0];
      if (subKey.indexOf("[]") > -1) {
        if (key.indexOf("[]") === -1 || typeof fieldIndex !== "number") {
          console.error(
            `[dispatchFormValue] Field index is missing for array field. Key: ${key} fieldIndex: ${fieldIndex}`,
          );
          return null;
        }
        subKey = subKey.replace("[]", "");
        const array: any[] = [];
        array[fieldIndex] = value;
        valueUsed = array;
      }
      caseFieldsToUpdate[key] = valueUsed;
    } else {
      const caseWithUpdatedField = createNestedObject(keys, valueUsed, fieldIndex);
      caseFieldsToUpdate = _.merge(caseFieldsToUpdate, caseWithUpdatedField);
    }
  }
  dispatch(updateCaseFields(caseFieldsToUpdate));
}

export function getUpdateProfileData(key: string, profile: AsylumCaseProfileOptional, fieldIndex?: number) {
  const keys = key.split(".");
  if (keys.length === 1) {
    return { [keys[0]]: profile };
  } else {
    return createNestedObject(keys, profile, fieldIndex);
  }
}

export function getUpdateApplicationCaseData(applicationCase: ApplicationCase): UpdateApplicationCaseData {
  return {
    ...applicationCase,
    profile: applicationCase.profile,
  };
}

export function updateProfileAndProgress(profile: AsylumCaseProfile, progress: Progress) {
  return {
    profile,
    progress,
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

export async function downloadDocument(presignedUrl: string, additionalData?: any) {
  try {
    const response = await fetch(presignedUrl);
    const doc = await response.blob();
    return { document: doc, ...additionalData };
  } catch (err) {
    console.error("Error downloading document:", err);
  }
}

export function parseCityAndCountryStr(cityAndCountry: string, locationObject?: LocationObject) {
  if (locationObject) {
    return {
      city: locationObject.city ?? "",
      state: locationObject.state ?? "",
      country: locationObject.country ?? "",
    };
  }
  if (!cityAndCountry) return { city: "", state: "", country: "" };
  const cityAndCountryArr = cityAndCountry.split(", ");
  if (cityAndCountryArr.length === 1) return { city: "", state: "", country: cityAndCountryArr[0] ?? "" };
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

export function formatCityAndCountryStr(country?: string, state?: string, city?: string) {
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

export function getPrefillLocationOptions(cityAndCountry: string, locationObject?: LocationObject): LocationInfo {
  const { country, state, city } = parseCityAndCountryStr(cityAndCountry, locationObject);

  const allCountries = Country.getAllCountries();
  const result = { countries: allCountries };
  const prefillCountry = allCountries.find(c => c.name.toLocaleLowerCase() === country.toLocaleLowerCase());

  if (!prefillCountry) return result;
  const countryPrefillOption = {
    value: prefillCountry.name,
    label: `${prefillCountry.flag} ${prefillCountry.name}`,
    key: prefillCountry.isoCode,
  };
  result["countryPrefillOption"] = countryPrefillOption;

  const allStates = State.getStatesOfCountry(countryPrefillOption.key);
  result["states"] = allStates;

  if (!state) return result;

  const prefillState = allStates.find(s => s.name.toLocaleLowerCase() === state.toLocaleLowerCase());

  if (!prefillState) {
    // if we can't find the state, we will try to find the city, user might have entered city and country only
    allStates.forEach(s => {
      const cities = City.getCitiesOfState(countryPrefillOption.key, s.isoCode);
      const prefillCity = cities.find(c => c.name.toLocaleLowerCase() === state.toLocaleLowerCase());
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
  const allCities = City.getCitiesOfState(countryPrefillOption.key, statePrefillOption.key);
  result["cities"] = allCities;
  const prefillCity = allCities.find(c => c.name.toLocaleLowerCase() === city.toLocaleLowerCase());

  if (!prefillCity) return result;
  const cityPrefillOption = {
    value: prefillCity.name,
    label: prefillCity.name,
  };
  result["cityPrefillOption"] = cityPrefillOption;

  return result;
}

export function getIdentity(fieldKey: string, fieldIndex?: number) {
  let identity: Identity = "Applicant";
  if (fieldKey.indexOf("family.spouse") > -1) {
    identity = "Spouse";
  } else if (fieldKey.indexOf("family.children") > -1) {
    if (fieldIndex === undefined || isNaN(fieldIndex) || fieldIndex === null) {
      console.error("Field index is missing in modal data for family.children");
      return "Child_1";
    }
    identity = ("Child_" + (fieldIndex + 1)) as Identity;
  }
  return identity;
}

export function createKeyValuesForAddItem(fieldValue: any) {
  const keyValues: any = {};
  if (fieldValue.countKey) {
    keyValues[fieldValue.countKey] = parseInt(fieldValue.count) + 1;
  }
  if (fieldValue.arrKey) {
    const arrayField = getArrayFieldInfo(fieldValue.arrKey);
    keyValues[arrayField.overwriteField] = true;
    keyValues[fieldValue.arrKey] = [...fieldValue.arr, arrayField.default];
  }
  return keyValues;
}

export function createKeyValuesForRemoveItem(fieldValue: any, arrIndex: number) {
  const newArr = [...fieldValue.arr];
  newArr.splice(arrIndex, 1);
  const keyValues: any = {};
  if (fieldValue.countKey) {
    keyValues[fieldValue.countKey] = fieldValue.count - 1;
  }
  if (fieldValue.arrKey) {
    const arrayField = getArrayFieldInfo(fieldValue.arrKey);
    keyValues[arrayField.overwriteField] = true;
    keyValues[fieldValue.arrKey] = newArr;
  }
  return keyValues;
}

export function getArrayFieldInfo(fieldKey: string) {
  const arrayField = ArrayFields.find(f => f.field === fieldKey);
  if (!arrayField) {
    console.error(`[getArrayFieldInfo] Array field is missing for key: ${fieldKey}`);
    return ArrayFields[0];
  }
  return arrayField;
}

export function convertBooleans(obj: any) {
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      convertBooleans(obj[key]);
    } else if (obj[key] === "true" || obj[key] === "false") {
      obj[key] = obj[key] === "true";
    }
  }
  return obj;
}

export function getCurrentHoursMinutesSeconds() {
  const date = new Date();
  return date.toLocaleTimeString("en-EN", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function isNullOrUndefined(value: any) {
  return value === null || value === undefined;
}

export function isSectionVisible(visibility: string, caseDetails: AsylumCaseProfile, fieldIndex?: number) {
  let visibilityArray: string[];
  //| represents the "or" logic
  if (visibility.indexOf("|") > -1) {
    visibilityArray = visibility.split("|");
  } else {
    visibilityArray = [visibility];
  }
  let isVisible = false;
  for (let i = 0; i < visibilityArray.length; i++) {
    const [key, value] = visibilityArray[i].split("=");
    const caseDetailValue = getCaseDetailValue(caseDetails, key, fieldIndex);
    if (caseDetailValue === value || (!caseDetailValue && (value === "null" || value === "undefined"))) {
      isVisible = true;
    }
  }
  return isVisible;
}
