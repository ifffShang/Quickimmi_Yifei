import { Ads } from "./Ads";
import { SignIn } from "./SignIn";
import "./AuthPage.css";
import { Col, Row } from "antd";
import { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { updateShowNavbar } from "../../../reducers/commonSlice";

export interface AuthContainerProps {
  type: "signin" | "signup" | "forgotpassword" | "resetpassword";
}

export function AuthPage(props: AuthContainerProps) {
  const dispatch = useAppDispatch();

  let authComponent;
  if (props.type === "signin") {
    authComponent = <SignIn />;
  }
  // } else if (props.component === "signup") {
  //   authComponent = <SignUp />;
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
      <Row justify="center">
        <Col span={9}>
          <Ads />
        </Col>
        <Col span={10} offset={1}>
          <div className="auth-component">{authComponent}</div>
        </Col>
      </Row>
    </div>
  );
}
