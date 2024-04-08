import { useTranslation } from "react-i18next";
import { textParser } from "../utils/parsers";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useFormTranslation() {
  const { t } = useTranslation();
  const wt = textParser(t);
  return { t, wt };
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
