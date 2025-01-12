import { TFunction } from "i18next";
// import en from "../locales/en/translation.json";

type OptionObject = { value: string; label: string };

export const arrayMapper =
  (t: TFunction, ent: TFunction) =>
  (key: string): OptionObject[] => {
    const enOptions: string[] = ent(key, { returnObjects: true }) as string[];

    // Attempt to retrieve the array of strings using the translation function
    const options: string[] = t(key, { returnObjects: true }) as string[];

    // For state, since we want to store short name as the value, so we need to split the string since its english format is "State-ShortName"
    if (key === "StateOptions") {
      return options?.map((option, index) => ({
        value: enOptions[index].split("-")[1],
        label: option.split("-")[0],
      }));
    }

    // Map each string in the array to an object with a 'value' and 'label' property
    return options?.map((option, index) => ({
      value: enOptions[index],
      label: option,
    }));
  };
