import { TFunction } from "i18next";
// import en from "../locales/en/translation.json";

type OptionObject = { value: string; label: string };

export const arrayMapper =
  (t: TFunction, ent: TFunction) =>
  (key: string): OptionObject[] => {
    const enOptions: string[] = ent(key, { returnObjects: true }) as string[];

    // Attempt to retrieve the array of strings using the translation function
    const options: string[] = t(key, { returnObjects: true }) as string[];

    // Map each string in the array to an object with a 'value' and 'label' property
    return options?.map((option, index) => ({
      value: enOptions[index],
      label: option,
    }));
  };
