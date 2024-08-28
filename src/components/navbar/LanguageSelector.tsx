import i18next from "i18next";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useClickOutsideOfRef } from "../../hooks/commonHooks";
import { Language } from "../../model/commonModels";
import { updateLanguage } from "../../reducers/commonSlice";
import { CheckOutlined, GlobalOutlined } from "@ant-design/icons";
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
  }, [selectedLanguage]);

  const handleChangeLanguage = (language: Language) => {
    if (language !== selectedLanguage) {
      i18next.changeLanguage(language, err => {
        if (err) return console.error("something went wrong loading", err);
      });
      dispatch(updateLanguage(language));
      setIsPopupOpen(false);
    }
  };

  return (
    <div ref={componentRef} className={isPopupOpen ? "lang-container popup" : "lang-container"}>
      <div className="lang-display" onClick={() => setIsPopupOpen(!isPopupOpen)}>
        <GlobalOutlined />
      </div>
      {isPopupOpen && (
        <div className="lang-popup">
          <div
            className={`lang-option ${selectedLanguage === "en" ? "selected-lang" : ""}`}
            onClick={() => selectedLanguage !== "en" && handleChangeLanguage("en")}
          >
            EN {selectedLanguage === "en"}
          </div>
          <div
            className={`lang-option ${selectedLanguage === "cn" ? "selected-lang" : ""}`}
            onClick={() => selectedLanguage !== "cn" && handleChangeLanguage("cn")}
          >
            CN {selectedLanguage === "cn"}
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;
