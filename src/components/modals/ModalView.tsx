import { CloseOutlined } from "@ant-design/icons";
import Link from "antd/es/typography/Link";
import { ReactNode, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeModal } from "../../reducers/commonSlice";
import "./ModalView.css";
import { UploadPassportModal } from "./case/UploadPassportModal";
import { UploadOtherIdModal } from "./case/UploadOtherIdModal";

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

  let innerModal = null;
  if (common.modalType === "uploadpassport") {
    innerModal = <UploadPassportModal />;
  } else if (common.modalType === "uploadotherid") {
    innerModal = <UploadOtherIdModal />;
  }

  return <Modal>{innerModal}</Modal>;
}
