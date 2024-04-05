import i18next, { use } from "i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateLanguage } from "../../reducers/commonSlice";
import { En } from "../icons/En";
import { Cn } from "../icons/Cn";
import "./LanguageSelector.css";
import { ArrowDown } from "../icons/ArrowDown";
import { useRef, useState } from "react";
import { Language, ScreenSize } from "../../model/Models";
import { useClickOutsideOfRef } from "../../hooks/commonHooks";

export function LanguageSelector() {
  const dispatch = useAppDispatch();
  const selectedLanguage = useAppSelector(
    state => state.common.selectedLanguage,
  );
  const screenSize = useAppSelector(state => state.common.screenSize);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const componentRef = useRef<HTMLDivElement>(null);

  useClickOutsideOfRef(componentRef, setIsPopupOpen);

  const handleChangeLanguage = (language: Language) => {
    i18next.changeLanguage(language, err => {
      if (err) return console.error("something went wrong loading", err);
    });
    dispatch(updateLanguage(language));
    setIsPopupOpen(false);
  };

  let languageDisplay =
    screenSize !== ScreenSize.small && screenSize !== ScreenSize.xsmall ? (
      <>
        <En />
        EN
      </>
    ) : (
      <En />
    );

  let languageOption = (
    <div className="lang-option" onClick={() => handleChangeLanguage("cn")}>
      <Cn />
      中文
    </div>
  );

  if (selectedLanguage === "cn") {
    languageDisplay =
      screenSize !== ScreenSize.small && screenSize !== ScreenSize.xsmall ? (
        <>
          <Cn />
          中文
        </>
      ) : (
        <Cn />
      );

    languageOption = (
      <div className="lang-option" onClick={() => handleChangeLanguage("en")}>
        <En />
        EN
      </div>
    );
  }

  return (
    <div
      ref={componentRef}
      className={isPopupOpen ? "lang-container popup" : "lang-container"}>
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
