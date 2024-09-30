import { LockOutlined, SafetyOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { confirmResetPassword, confirmSignUp, resendSignUpCode, resetPassword } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { validateCode, validatePassword, validatePasswordConfirmation } from "../../../utils/validators";
import { FormInput } from "../../form/fields/Controls";
import { ErrorMessage, QText } from "../../common/Fonts";
import { AuthComponent } from "./AuthComponent";
import "./ConfirmCode.css";

export function ConfirmCode() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const auth = useAppSelector(state => state.auth);
  const [errorMessage, setErrorMessage] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showFormInputErrorMessage, setShowFormInputErrorMessage] = useState(false);

  useEffect(() => {
    setShowFormInputErrorMessage(false);
    setErrorMessage("");
  }, [verificationCode, newPassword, confirmPassword]);

  const setVerificationCodeWithInputCheck = (value: string) => {
    const code = value.replace(/\D/g, "");
    setVerificationCode(code);
  };

  const verifyCode = async () => {
    if (!auth.email || validateCode(verificationCode) !== "") {
      setShowFormInputErrorMessage(true);
      return;
    }

    if (auth.prevStep === "forgotpassword") {
      try {
        await confirmResetPassword({
          username: auth.email,
          newPassword,
          confirmationCode: verificationCode,
        });
        setErrorMessage("");
        navigate("/authsuccess");
      } catch (error: any) {
        if (error?.name === "CodeMismatchException") {
          setErrorMessage("Invalid verification code.");
          return;
        }
        if (error?.name === "LimitExceededException") {
          setErrorMessage("Too many attempts. Please try again later.");
          return;
        }
        console.error("Error confirming password reset: ", error);
        setErrorMessage("Error confirming password reset. Please try again.");
      }
    } else if (auth.prevStep === "signup" || auth.prevStep === "signin") {
      try {
        const { isSignUpComplete } = await confirmSignUp({
          username: auth.email,
          confirmationCode: verificationCode,
        });
        if (isSignUpComplete) {
          setErrorMessage("");
          navigate("/authsuccess");
        } else {
          setErrorMessage("Error confirming sign up. Please try again.");
        }
      } catch (error) {
        console.error("Error confirming sign up: ", error);
        setErrorMessage("Error confirming sign up. Please try again.");
      }
    }
  };

  const resendCode = async () => {
    if (!auth.email) {
      setErrorMessage("Email is not set.");
      return;
    }

    if (auth.prevStep === "forgotpassword") {
      try {
        await resetPassword({ username: auth.email });
        setErrorMessage("");
      } catch (error) {
        console.error("Error sending forgot password: ", error);
        setErrorMessage("Error sending forgot password. Please try again.");
      }
    }

    if (auth.prevStep === "signup" || auth.prevStep === "signin") {
      try {
        await resendSignUpCode({ username: auth.email });
        setErrorMessage("");
      } catch (error) {
        console.error("Error resending verification code: ", error);
        setErrorMessage("Error resending verification code. Please try again.");
      }
    }
  };

  let form,
    header = "";

  if (auth.prevStep === "forgotpassword") {
    header = "Forgot Password?";
    form = (
      <>
        <div className="confirm-code-description">
          <QText color="secondary">{t("InputConfirmationCode") + auth.email}</QText>
          <Button type="link" onClick={resendCode}>
            Resend code
          </Button>
        </div>
        <FormInput
          placeholder={t("VerificationCode")}
          value={verificationCode}
          icon={<SafetyOutlined className="site-form-item-icon" />}
          onChange={setVerificationCodeWithInputCheck}
          validate={validateCode}
          showErrorMessage={showFormInputErrorMessage}
          autoComplete="new-code"
        />
        <FormInput
          placeholder={t("NewPassword")}
          value={newPassword}
          icon={<LockOutlined className="site-form-item-icon" />}
          onChange={setNewPassword}
          validate={validatePassword}
          showErrorMessage={showFormInputErrorMessage}
          isPassword={true}
          autoComplete="new-password"
        />
        <FormInput
          placeholder={t("ConfirmNewPassword")}
          value={confirmPassword}
          icon={<LockOutlined className="site-form-item-icon" />}
          onChange={setConfirmPassword}
          validate={() => validatePasswordConfirmation(newPassword, confirmPassword)}
          showErrorMessage={showFormInputErrorMessage}
          isPassword={true}
          autoComplete="new-password"
        />
      </>
    );
  }

  if (auth.prevStep === "signup" || auth.prevStep === "signin") {
    header = "Confirm Code";
    form = (
      <>
        <div className="confirm-code-description">
          <QText color="secondary">{t("InputConfirmationCode") + auth.email}</QText>
          <Button type="link" onClick={resendCode}>
            Resend code
          </Button>
        </div>
        <FormInput
          placeholder={t("VerificationCode")}
          value={verificationCode}
          icon={<SafetyOutlined className="site-form-item-icon" />}
          onChange={setVerificationCodeWithInputCheck}
          validate={validateCode}
          showErrorMessage={showFormInputErrorMessage}
          autoComplete="new-code"
        />
      </>
    );
  }

  const actions = (
    <>
      <Button type="primary" onClick={verifyCode}>
        Verify
      </Button>
    </>
  );

  const error = errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>;

  const bottomTop = (
    <>
      <QText>{"Doesn't have account?"}</QText>
      <Button type="link" onClick={() => navigate("/signup")}>
        Sign Up
      </Button>
    </>
  );

  const bottomBottom = (
    <>
      <QText color="secondary">
        By signing up, I agree to the QuickImmi&apos;s Privacy Statement and Terms of Service.
      </QText>
    </>
  );

  return (
    <AuthComponent
      formHeader={header}
      form={form}
      actions={actions}
      error={error}
      bottomTop={bottomTop}
      bottomBottom={bottomBottom}
    />
  );
}
