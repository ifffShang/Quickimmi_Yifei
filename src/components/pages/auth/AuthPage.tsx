import { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { updateShowNavbar } from "../../../reducers/commonSlice";
import { Ads } from "./Ads";
import "./AuthPage.css";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { ForgotPassword } from "./ForgotPassword";
import { ConfirmCode } from "./ConfirmCode";
import { AuthSuccess } from "./AuthSuccess";

export interface AuthContainerProps {
  type: "signin" | "signup" | "forgotpassword" | "confirmcode" | "authsuccess";
}

export function AuthPage(props: AuthContainerProps) {
  const dispatch = useAppDispatch();

  let authComponent;
  if (props.type === "signin") {
    authComponent = <SignIn />;
  } else if (props.type === "signup") {
    authComponent = <SignUp />;
  } else if (props.type === "forgotpassword") {
    authComponent = <ForgotPassword />;
  } else if (props.type === "confirmcode") {
    authComponent = <ConfirmCode />;
  } else if (props.type === "authsuccess") {
    authComponent = <AuthSuccess />;
  }

  return (
    <div className="auth-page">
      <div className="auth-row">
        <div className="auth-col col-left">
          <Ads />
        </div>
        <div className="auth-col col-right">
          <div className="auth-component">{authComponent}</div>
        </div>
      </div>
    </div>
  );
}
