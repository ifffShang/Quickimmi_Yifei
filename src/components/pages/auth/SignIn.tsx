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
    <div className="signin">
      <div>Login</div>
      <FormInput
        placeholder={t("Email")}
        value={email}
        onChange={setEmail}
        autoComplete="email"
      />
      <FormInput
        placeholder={t("Password")}
        value={password}
        onChange={setPassword}
        isPassword={true}
      />
      <Link onClick={forgotPasswordLinkClick}>Forgot Password?</Link>
      <Button type="primary" onClick={loginUser}>
        Login
      </Button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <div className="single-line">
        <div>{"Doesn't have account?"}</div>
        <Link onClick={signup}>Sign Up</Link>
      </div>
    </div>
  );
}
