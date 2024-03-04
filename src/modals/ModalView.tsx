import React, { ReactNode, useCallback } from "react";
import "./ModalView.css";
import { useAppSelector } from "../app/hooks";
import { SignIn } from "./signIn/SignIn";
import Link from "antd/es/typography/Link";
import { useDispatch } from "react-redux";
import { closeModal } from "../reducers/commonSlice";
import { SignUp } from "./signUp/SignUp";

function Modal({ children }: { children?: ReactNode }) {
  const dispatch = useDispatch();

  const close = useCallback(() => {
    dispatch(closeModal());
  }, []);

  return (
    <div className="modalview-container">
      <div className="modalview-popup">
        <Link className="modalview-close" onClick={close}>
          X
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
  if (common.modalType === "signin") {
    innerModal = <SignIn />;
  } else if (common.modalType === "signup") {
    innerModal = <SignUp />;
  }

  return <Modal>{innerModal}</Modal>;
}
