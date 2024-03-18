import i18next from "i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateLanguage } from "../../reducers/commonSlice";

export function LanguageSelector() {
  const dispatch = useAppDispatch();
  const selectedLanguage = useAppSelector(
    state => state.common.selectedLanguage,
  );

  const handleChangeLanguage = (e: any) => {
    const newLanguage = e.target.value;

    i18next.changeLanguage(newLanguage, err => {
      if (err) return console.error("something went wrong loading", err);
    });

    dispatch(updateLanguage(newLanguage));
  };

  return (
    <div>
      <select value={selectedLanguage} onChange={handleChangeLanguage}>
        <option value="en">English</option>
        <option value="cn">中文</option>
        {/* Add more languages as needed */}
      </select>
    </div>
  );
}

export default LanguageSelector;
