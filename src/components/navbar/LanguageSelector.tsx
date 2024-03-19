import i18next from "i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateLanguage } from "../../reducers/commonSlice";
import { En } from "../icons/En";
import { Cn } from "../icons/Cn";
import "./LanguageSelector.css";
import { ArrowDown } from "../icons/ArrowDown";
import { useState } from "react";
import { Language } from "../../model/Models";

export function LanguageSelector() {
  const dispatch = useAppDispatch();
  const selectedLanguage = useAppSelector(
    state => state.common.selectedLanguage,
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleChangeLanguage = (language: Language) => {
    i18next.changeLanguage(language, err => {
      if (err) return console.error("something went wrong loading", err);
    });
    dispatch(updateLanguage(language));
    setIsPopupOpen(false);
  };

  let languageDisplay = (
    <>
      <En />
      EN
    </>
  );
  let languageOption = (
    <div className="lang-option" onClick={() => handleChangeLanguage("cn")}>
      <Cn />
      中文
    </div>
  );
  if (selectedLanguage === "cn") {
    languageDisplay = (
      <>
        <Cn />
        中文
      </>
    );
    languageOption = (
      <div className="lang-option" onClick={() => handleChangeLanguage("en")}>
        <En />
        EN
      </div>
    );
  }

  return (
    <div className={isPopupOpen ? "lang-container popup" : "lang-container"}>
      <div
        className="lang-display"
        onClick={() => setIsPopupOpen(!isPopupOpen)}>
        {languageDisplay}
        <ArrowDown />
      </div>
      {isPopupOpen && <div className="lang-popup">{languageOption}</div>}
    </div>
  );
}

export default LanguageSelector;
