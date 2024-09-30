import { CloseOutlined } from "@ant-design/icons";
import { ReactNode, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeModal } from "../../reducers/commonSlice";
import "./ModalView.css";
import { RegisterApplicationFinalResultReceiptModal } from "./case/RegisterApplicationFinalResultReceiptModal";
import { RegisterApplicationReceiptModal } from "./case/RegisterApplicationReceiptModal";
import { RegisterFingerprintTimeLocationModal } from "./case/RegisterFingerprintTimeLocationModal";
import { RegisterInterviewTimeLocationModal } from "./case/RegisterInterviewTimeLocationModal";
import { RegisterTrackingNumberModal } from "./case/RegisterTrackingNumberModal";
import { SortableSectionAddModal } from "./case/SortableSectionAddModal";
import { TokenRefreshModal } from "./case/TokenRefreshModal";
import { UploadOtherIdModal } from "./case/UploadOtherIdModal";
import { UploadPassportModal } from "./case/UploadPassportModal";
import { UploadSignedDocumentModal } from "./case/UploadSignedDocumentModal";
import { Button } from "antd";

interface ModalProps {
  children?: ReactNode;
  closeButtonEnabled?: boolean;
}

function Modal({ children, closeButtonEnabled = true }: ModalProps) {
  const dispatch = useAppDispatch();

  const close = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  return (
    <div className="modalview-container">
      <div className="modalview-popup">
        {closeButtonEnabled && (
          <Button type="link" className="modalview-close" onClick={close}>
            <CloseOutlined />
          </Button>
        )}
        <div className="modalview-content">{children}</div>
      </div>
    </div>
  );
}

export function ModalView() {
  const common = useAppSelector(state => state.common);

  if (!common.showModal) {
    return null;
  }

  let innerModal;
  switch (common.modalType) {
    case "uploadpassport":
      innerModal = <UploadPassportModal />;
      break;
    case "uploadotherid":
      innerModal = <UploadOtherIdModal />;
      break;
    case "uploadSignedDocument":
      innerModal = <UploadSignedDocumentModal modalData={common.modalData} />;
      break;
    case "registerTrackingNumber":
      innerModal = <RegisterTrackingNumberModal modalData={common.modalData} />;
      break;
    case "registerApplicationReceipt":
      innerModal = <RegisterApplicationReceiptModal modalData={common.modalData} />;
      break;
    case "registerFingerprintTimeLocation":
      innerModal = <RegisterFingerprintTimeLocationModal modalData={common.modalData} />;
      break;
    case "registerInterviewTimeLocation":
      innerModal = <RegisterInterviewTimeLocationModal modalData={common.modalData} />;
      break;
    case "registerApplicationFinalResultReceipt":
      innerModal = <RegisterApplicationFinalResultReceiptModal modalData={common.modalData} />;
      break;
    case "tokenRefreshPopup":
      innerModal = <TokenRefreshModal />;
      break;
    case "sortableSectionAddModal":
      innerModal = <SortableSectionAddModal />;
      break;
    default:
      innerModal = null;
  }

  return <Modal closeButtonEnabled={common.closeModalButtonEnabled ?? true}>{innerModal}</Modal>;
}
