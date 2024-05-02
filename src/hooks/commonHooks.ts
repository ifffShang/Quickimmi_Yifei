import { Dispatch, SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { arrayMapper } from "../utils/mapper";
import { textParser } from "../utils/parsers";

export function useFormTranslation() {
  const { t, i18n } = useTranslation();
  const ent = i18n.getFixedT("en");
  const wt = textParser(t);
  const wa = arrayMapper(t, ent);
  return { t, wt, wa };
}

export function useClickOutsideOfRef(
  ref: React.RefObject<HTMLDivElement>,
  show: Dispatch<SetStateAction<boolean>>,
) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        show && show(false);
      }
    }
    // Bind the event listener
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);
}
