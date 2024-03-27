import { Button } from "antd";
import Link from "antd/es/typography/Link";
import {
  fetchAuthSession,
  resendSignUpCode,
  resetPassword,
  signIn,
} from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../app/hooks";
import { openModal, updateLoginInfo } from "../../../reducers/authSlice";
import { FormInput } from "../../common/Controls";
import { ErrorMessage } from "../../common/Fonts";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./SignIn.css";
import { Logo } from "../../icons/Logo";

export function SignIn() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  const signup = () => {
    dispatch(openModal({ modalType: "signup" }));
  };

  const loginUser = async () => {
    try {
      if (!email || !password) {
        setErrorMessage("Please provide email and password.");
        return;
      }
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password,
      });
      if (isSignedIn) {
        const session = await fetchAuthSession();
        dispatch(
          updateLoginInfo({
            isLoggedIn: true,
            email,
            accessToken: session.tokens?.accessToken?.toString(),
          }),
        );
      } else if (nextStep?.signInStep === "CONFIRM_SIGN_UP") {
        await resendSignUpCode({ username: email });
        dispatch(
          openModal({
            modalType: "confirmcode",
            prevStep: "signin",
            email,
          }),
        );
      }
    } catch (error: any) {
      console.log("Error logging in: ", error);
      setErrorMessage("Cannot login with provided credentials.");
    }
  };

  const forgotPasswordLinkClick = async () => {
    try {
      const { nextStep } = await resetPassword({ username: email });
      if (nextStep.resetPasswordStep === "CONFIRM_RESET_PASSWORD_WITH_CODE") {
        dispatch(
          openModal({
            modalType: "confirmcode",
            prevStep: "forgotpassword",
            email,
          }),
        );
      } else {
        console.log("Successfully reset password: ", nextStep);
      }
    } catch (error) {
      console.error("Error sending forgot password: ", error);
      setErrorMessage("Error sending forgot password.");
    }
  };

  return (
    <div className="auth-container signin">
      <div className="auth-brand">
        <Logo />
      </div>

      <div className="auth-form">
        <div className="auth-title">Login</div>
        <FormInput
          placeholder={t("Enter your email")}
          value={email}
          onChange={setEmail}
          autoComplete="email"
          icon={<UserOutlined />}
        />
        <FormInput
          placeholder={t("Enter your password")}
          value={password}
          onChange={setPassword}
          isPassword={true}
          icon={<LockOutlined />}
        />
        <div className="auth-actions">
          <Link onClick={forgotPasswordLinkClick}>Forgot Password?</Link>
          <Button type="primary" onClick={loginUser}>
            Login
          </Button>
        </div>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </div>

      <div className="auth-bottom single-line">
        <div className="auth-bottom-top">
          <div>{"Doesn't have account?"}</div>
          <Link onClick={signup}>Sign Up</Link>
        </div>
        <div>
          By signing up, I agree to the QuickImmi&apos;s Privacy Statement and
          Terms of Service.
        </div>
      </div>
    </div>
  );
}
