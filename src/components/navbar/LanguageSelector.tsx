import i18next from "i18next";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useClickOutsideOfRef } from "../../hooks/commonHooks";
import { Language } from "../../model/commonModels";
import { updateLanguage } from "../../reducers/commonSlice";
import { ArrowDown } from "../icons/ArrowDown";
import "./LanguageSelector.css";

export function LanguageSelector() {
  const dispatch = useAppDispatch();
  const selectedLanguage = useAppSelector(state => state.common.selectedLanguage);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const componentRef = useRef<HTMLDivElement>(null);

  useClickOutsideOfRef(componentRef, setIsPopupOpen);

  useEffect(() => {
    i18next.changeLanguage(selectedLanguage, err => {
      if (err) return console.error("something went wrong loading", err);
    });
  }, []);

  const handleChangeLanguage = (language: Language) => {
    i18next.changeLanguage(language, err => {
      if (err) return console.error("something went wrong loading", err);
    });
    dispatch(updateLanguage(language));
    setIsPopupOpen(false);
  };

  let languageDisplay = <>EN</>;
  let languageOption = (
    <div className="lang-option" onClick={() => handleChangeLanguage("cn")}>
      中文
    </div>
  );

  if (selectedLanguage === "cn") {
    languageDisplay = <>中文</>;
    languageOption = (
      <div className="lang-option" onClick={() => handleChangeLanguage("en")}>
        EN
      </div>
    );
  }

  return (
    <div ref={componentRef} className={isPopupOpen ? "lang-container popup" : "lang-container"}>
      <div className="lang-display" onClick={() => setIsPopupOpen(!isPopupOpen)}>
        {languageDisplay}
        <ArrowDown />
      </div>
      {isPopupOpen && <div className="lang-popup">{languageOption}</div>}
    </div>
  );
}

export default LanguageSelector;
