import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { QText } from "../../common/Fonts";
import "./SortableSectionAddModal.css";
import { useTranslation } from "react-i18next";
import { closeModal } from "../../../reducers/commonSlice";

export function SortableSectionAddModal() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const modalData = useAppSelector(state => state.common.modalData);

  if (!modalData) return null;

  return (
    <div className="sortable-section-add-modal">
      <QText level="large" margin="margin-bottom-20">
        {modalData.label}
      </QText>
      <div className="sortable-section-add-content">{modalData.content}</div>
      <div className="sortable-section-add-footer">
        <Button
          type="primary"
          onClick={() => {
            dispatch(closeModal());
          }}
        >
          {t("Confirm")}
        </Button>
      </div>
    </div>
  );
}
