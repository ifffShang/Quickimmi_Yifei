import { useTranslation } from "react-i18next";
import { getCurrentHoursMinutesSeconds } from "../../../utils/utils";
import { QText } from "../../common/Fonts";
import { useAppSelector } from "../../../app/hooks";
import { useEffect, useState } from "react";

export function AutoSaveTag() {
  const { t } = useTranslation();
  const saveTimes = useAppSelector(state => state.form.saveTimes);
  const [displayAutoSaveTag, setDisplayAutoSaveTag] = useState(false);
  const [time, setTime] = useState(getCurrentHoursMinutesSeconds());

  useEffect(() => {
    setTime(getCurrentHoursMinutesSeconds());
    setDisplayAutoSaveTag(true);
  }, [saveTimes]);

  if (!displayAutoSaveTag) {
    return null;
  }

  return (
    <div className="form-header-tag">
      <QText level="xsmall">{time + " " + t("Form save is successful")}</QText>
    </div>
  );
}
