import React, { ReactNode, useCallback } from "react";
import "./ModalView.css";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { SignIn } from "./auth/SignIn";
import Link from "antd/es/typography/Link";
import { closeModal } from "../reducers/authSlice";
import { SignUp } from "./auth/SignUp";
import { ConfirmCode } from "./auth/ConfirmCode";

function Modal({ children }: { children?: ReactNode }) {
  const dispatch = useAppDispatch();

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
  const auth = useAppSelector(state => state.auth);

  if (!auth.showModal) {
    return null;
  }

  let innerModal = null;
  if (auth.modalType === "signin") {
    innerModal = <SignIn />;
  } else if (auth.modalType === "signup") {
    innerModal = <SignUp />;
  } else if (auth.modalType === "confirmcode") {
    innerModal = <ConfirmCode />;
  }

  return <Modal>{innerModal}</Modal>;
}
