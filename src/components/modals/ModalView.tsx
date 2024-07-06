import { CloseOutlined } from "@ant-design/icons";
import Link from "antd/es/typography/Link";
import { ReactNode, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeModal } from "../../reducers/commonSlice";
import "./ModalView.css";
import { UploadOtherIdModal } from "./case/UploadOtherIdModal";
import { UploadPassportModal } from "./case/UploadPassportModal";
import { UploadSignedDocumentModal } from "./case/UploadSignedDocumentModal";
import { RegisterTrackingNumberModal } from "./case/RegisterTrackingNumberModal";
import { RegisterApplicationReceiptModal } from "./case/RegisterApplicationReceiptModal";
import {RegisterFingerprintTimeLocationModal} from "./case/RegisterFingerprintTimeLocationModal";
import {RegisterInterviewTimeLocationModal} from "./case/RegisterInterviewTimeLocationModal";
import {RegisterApplicationFinalResultReceiptModal} from "./case/RegisterApplicationFinalResultReceiptModal";

function Modal({ children }: { children?: ReactNode }) {
  const dispatch = useAppDispatch();

  const close = useCallback(() => {
    dispatch(closeModal());
  }, []);

  return (
    <div className="modalview-container">
      <div className="modalview-popup">
        <Link className="modalview-close" onClick={close}>
          <CloseOutlined />
        </Link>
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
  if (common.modalType === "uploadpassport") {
    innerModal = <UploadPassportModal />;
  } else if (common.modalType === "uploadotherid") {
    innerModal = <UploadOtherIdModal />;
  } else if (common.modalType === "uploadSignedDocument") {
    innerModal = <UploadSignedDocumentModal />;
  } else if (common.modalType === "registerTrackingNumber") {
    innerModal = <RegisterTrackingNumberModal />;
  } else if (common.modalType === "registerApplicationReceipt") {
    innerModal = <RegisterApplicationReceiptModal />;
  } else if (common.modalType === "registerFingerprintTimeLocation") {
    innerModal = <RegisterFingerprintTimeLocationModal />;
  } else if (common.modalType === "registerInterviewTimeLocation") {
    innerModal = <RegisterInterviewTimeLocationModal />;
  } else if (common.modalType === "registerApplicationFinalResultReceipt") {
    innerModal = <RegisterApplicationFinalResultReceiptModal />;
  }

  return <Modal>{innerModal}</Modal>;
}
