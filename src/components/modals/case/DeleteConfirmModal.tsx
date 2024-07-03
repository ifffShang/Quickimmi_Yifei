// DeleteConfirmModal.tsx
import React from "react";
import { Modal, Button } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { QText } from "../../common/Fonts";
import "./DeleteConfirmModal.css";

interface DeleteConfirmModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  contentName?: string;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  visible,
  onConfirm,
  onCancel,
  contentName,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      className="delete-confirm-modal-container"
      footer={[
        <Button key="Cancel" onClick={onCancel}>
          {t("Cancel")}
        </Button>,
        <Button key="Delete" type="primary" danger onClick={onConfirm}>
          {t("Delete")}
        </Button>,
      ]}
    >
      <div className="delete-confirm-modal-body">
        <div className="delete-confirm-modal-body-icon">
          <DeleteTwoTone style={{ fontSize: 64 }} twoToneColor="#EB5757" />
        </div>
        <div className="delete-confirm-modal-body-message">
          <QText level="normal bold" color="dark">
            {t("DeleteConfirmMessage")}
          </QText>
          {contentName && (
            <QText level="normal bold" color="gray">
              {" "}
              {contentName}
            </QText>
          )}
        </div>
      </div>
    </Modal>
  );
};
