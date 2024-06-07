import { TFunction } from "i18next";

export const textParser = (t: TFunction) => (key: string) => {
  key = key?.replace(/text_/g, "");
  if (!key) {
    console.error("[textParser] Key is missing");
    return "";
  }
  return t(key);
};
