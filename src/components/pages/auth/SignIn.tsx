import { LockOutlined, MailOutlined } from "@ant-design/icons";
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
import { Text } from "../../common/Fonts";
import { AuthComponent } from "./AuthComponent";
import { useNavigate } from "react-router-dom";

export function SignIn() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

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
        navigate("/dashboard");
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
      if (error?.message === "Incorrect username or password.") {
        setErrorMessage("Incorrect username or password.");
        return;
      }
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

  const form = (
    <>
      <FormInput
        placeholder={t("Email address")}
        value={email}
        onChange={setEmail}
        autoComplete="email"
        icon={<MailOutlined className="site-form-item-icon" />}
      />
      <FormInput
        placeholder={t("Password")}
        value={password}
        onChange={setPassword}
        isPassword={true}
        icon={<LockOutlined className="site-form-item-icon" />}
      />
    </>
  );

  const actions = (
    <>
      <Link onClick={forgotPasswordLinkClick}>Forgot Password?</Link>
      <Button type="primary" onClick={loginUser}>
        Login
      </Button>
    </>
  );

  const error = errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>;

  const bottomTop = (
    <>
      <Text>{"Doesn't have account?"}</Text>
      <Link onClick={() => navigate("/signup")}>Sign Up</Link>
    </>
  );

  const bottomBottom = (
    <>
      <Text color="secondary">
        By signing up, I agree to the QuickImmi&apos;s Privacy Statement and
        Terms of Service.
      </Text>
    </>
  );

  return (
    <AuthComponent
      formHeader="Sign In"
      form={form}
      actions={actions}
      error={error}
      bottomTop={bottomTop}
      bottomBottom={bottomBottom}
    />
  );
}
