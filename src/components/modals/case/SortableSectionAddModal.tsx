import { useAppSelector } from "../../../app/hooks";
import { QText } from "../../common/Fonts";
import "./SortableSectionAddModal.css";

export function SortableSectionAddModal() {
  const modalData = useAppSelector(state => state.common.modalData);

  if (!modalData) return null;

  return (
    <div className="sortable-section-add-modal">
      <QText level="large" margin="margin-bottom-20">
        {modalData.label}
      </QText>
      <div className="sortable-section-add-content">{modalData.content}</div>
    </div>
  );
}
