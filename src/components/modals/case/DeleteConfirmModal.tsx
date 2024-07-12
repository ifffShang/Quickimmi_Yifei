// DeleteConfirmModal.tsx
import React from "react";
import { Modal, Button } from "antd";
import { ExclamationCircleTwoTone } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { QText } from "../../common/Fonts";
import "./DeleteConfirmModal.css";

interface DeleteConfirmModalProps {
  deleteItem: string;
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  contentName?: string;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  deleteItem,
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
        <Button key="Cancel" type="default" onClick={onCancel}>
          {t("Cancel")}
        </Button>,
        <Button key="Delete" type="primary" danger onClick={onConfirm}>
          {t("Delete")}
        </Button>,
      ]}
    >
      <div className="delete-confirm-modal-body">
        <div className="delete-confirm-modal-icon">
          <ExclamationCircleTwoTone style={{ fontSize: 24 }} twoToneColor="#EB5757" />
        </div>
        {deleteItem === "case" ? (
          <div className="delete-confirm-modal-content">
            <QText level="normal bold" color="dark">
            {`${t("DeleteCaseConfirmMessage")} ${contentName}?`}
            </QText>
            <QText level="small" color="gray">
              {t("DeleteCaseConfirmSubMessage")}
            </QText>
          </div>
        ) : (
          <div className="delete-confirm-modal-content">
            <QText level="normal bold" color="dark">
              {t("DeleteDocConfirmMessage")} <br />
              {contentName}?
            </QText>
            <QText level="small" color="gray">
              {t("DeleteDocConfirmSubMessage")}
            </QText>
          </div>
          )}
      </div>
    </Modal>
  );
};
