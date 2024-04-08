import { TFunction } from "i18next";

export const textParser = (t: TFunction) => (key: string) => {
  key = key.replace(/text_/g, "");
  return t(key);
};
