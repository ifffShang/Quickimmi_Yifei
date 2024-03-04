import {useTranslation} from "react-i18next";
import {textParser} from "../utils/parsers";

export function useWorkflowTranslation() {
  const {t} = useTranslation();
  const wt = textParser(t);
  return {t, wt};
}