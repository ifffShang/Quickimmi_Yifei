import Link from "antd/es/typography/Link";
import { ReactNode, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeModal } from "../../reducers/authSlice";
import "./ModalView.css";
import { ConfirmCode } from "./auth/ConfirmCode";
import { SignIn } from "../pages/auth/SignIn";
import { SignOutSccessMessage } from "./auth/SignOutSccessMessage";
import { SignUp } from "./auth/SignUp";

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
  if (auth.modalType === "signup") {
    innerModal = <SignUp />;
  } else if (auth.modalType === "confirmcode") {
    innerModal = <ConfirmCode />;
  } else if (auth.modalType === "signoutsccess") {
    innerModal = <SignOutSccessMessage />;
  }

  return <Modal>{innerModal}</Modal>;
}
