import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en/translation.json";
import cn from "./cn/translation.json";

const resources = {
  en: {
    translation: en,
  },
  cn: {
    translation: cn,
  },
};

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: "en",
    debug: true,
    react: {
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ["br", "strong", "i"],
    },
  });

export default i18n;
