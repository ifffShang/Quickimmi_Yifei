import { TFunction } from "i18next";

export const textParser = (t: TFunction) => (key: string) => {
  key = key.replace(/Text_/g, "");
  return t(key);
};
