import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ScreenSize } from "../../../model/Models";
import { updateShowNavbar } from "../../../reducers/commonSlice";
import { Ads } from "./Ads";
import "./AuthPage.css";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

export interface AuthContainerProps {
  type: "signin" | "signup" | "forgotpassword" | "resetpassword";
}

export function AuthPage(props: AuthContainerProps) {
  const dispatch = useAppDispatch();

  const screenSize = useAppSelector(state => state.common.screenSize);

  let authComponent;
  if (props.type === "signin") {
    authComponent = <SignIn />;
  } else if (props.type === "signup") {
    authComponent = <SignUp />;
  }
  // } else if (props.component === "forgotpassword") {
  //   authComponent = <ForgotPassword />;
  // } else if (props.component === "resetpassword") {
  //   authComponent = <ResetPassword />;
  // }

  useEffect(() => {
    dispatch(updateShowNavbar(false));
  }, []);

  return (
    <div className="auth-page">
      {screenSize === ScreenSize.small ? (
        <div className="auth-row">
          <div className="auth-col">
            <div className="auth-component">{authComponent}</div>
          </div>
          <div className="auth-col">
            <Ads />
          </div>
        </div>
      ) : (
        <div className="auth-row">
          <div className="auth-col col-left">
            <Ads />
          </div>
          <div className="auth-col col-right">
            <div className="auth-component">{authComponent}</div>
          </div>
        </div>
      )}
    </div>
  );
}
