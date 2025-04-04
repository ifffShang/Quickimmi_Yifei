import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { QText } from "../../common/Fonts";
import "./SortableSectionAddModal.css";
import { useTranslation } from "react-i18next";
import { closeModal } from "../../../reducers/commonSlice";
import React from "react";

export function SortableSectionAddModal() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const modalData = useAppSelector(state => state.common.modalData);

  if (!modalData) return null;

  if (!modalData.content || !React.isValidElement(modalData.content)) {
    console.error("SortableSectionAddModal: modalData.content is not a valid React element", modalData.content);
    return <div className="sortable-section-add-modal">Oops, something went wrong</div>;
  }

  return (
    <div className="sortable-section-add-modal">
      <QText level="large" className="sortable-section-add-header" margin="margin-bottom-20">
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
