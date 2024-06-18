import { useTranslation } from "react-i18next";
import { getCurrentHourandMinutes } from "../../../utils/utils";
import { QText } from "../../common/Fonts";
import { useAppSelector } from "../../../app/hooks";
import { useEffect, useState } from "react";

export function AutoSaveTag() {
  const { t } = useTranslation();
  const autoSaveTimes = useAppSelector(state => state.form.autoSaveTimes);
  const [displayAutoSaveTag, setDisplayAutoSaveTag] = useState(false);
  const [time, setTime] = useState(getCurrentHourandMinutes());

  useEffect(() => {
    setTime(getCurrentHourandMinutes());
    setDisplayAutoSaveTag(true);
    const timer = setTimeout(() => {
      setDisplayAutoSaveTag(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [autoSaveTimes]);

  if (!displayAutoSaveTag) {
    return null;
  }

  return (
    <div className="form-header-tag">
      <QText level="xsmall">{time + t(" auto save is successiful")}</QText>
    </div>
  );
}
