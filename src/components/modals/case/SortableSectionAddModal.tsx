import { Button } from "antd";
import { useAppSelector } from "../../../app/hooks";
import { QText } from "../../common/Fonts";
import "./SortableSectionAddModal.css";
import { useTranslation } from "react-i18next";

export function SortableSectionAddModal() {
  const { t } = useTranslation();
  const modalData = useAppSelector(state => state.common.modalData);

  if (!modalData) return null;

  return (
    <div className="sortable-section-add-modal">
      <QText level="large" margin="margin-bottom-20">
        {modalData.label}
      </QText>
      <div className="sortable-section-add-content">{modalData.content}</div>
      <div className="sortable-section-add-footer">
        <Button className="button" onClick={() => console.log("Cancel")}>
          {t("Cancel")}
        </Button>
        <Button type="primary" onClick={() => console.log("Add")}>
          {t("Add")}
        </Button>
      </div>
    </div>
  );
}
