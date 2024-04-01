import { Button } from "antd";
import Link from "antd/es/typography/Link";
import {
  confirmResetPassword,
  confirmSignUp,
  resendSignUpCode,
  resetPassword,
} from "aws-amplify/auth";
import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateAuthState } from "../../../reducers/authSlice";
import { FormInput } from "../../common/Controls";
import { ErrorMessage } from "../../common/Fonts";
import "./ConfirmCode.css";
import { useNavigate } from "react-router-dom";

export function ConfirmCode() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const inputRefs = useRef<any[]>([]);

  const auth = useAppSelector(state => state.auth);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    setErrorMessage("");

    const newArr = [...code];
    newArr[index] = e.target.value;
    setCode(newArr);

    if (e.target.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspaceAndEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    setErrorMessage("");

    if (e.key === "Backspace" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === "Enter" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const verifyCode = async () => {
    const verificationCode = code.join("");
    if (!auth.email) {
      setErrorMessage("Email is not set.");
      return;
    }
    if (verificationCode.length === 6) {
      if (auth.prevStep === "forgotpassword") {
        try {
          await confirmResetPassword({
            username: auth.email,
            newPassword,
            confirmationCode: verificationCode,
          });
          setErrorMessage("");
          setSuccessMessage(
            "Password is reset successfully. You will be redirected to login in 5 seconds...",
          );
          setTimeout(() => {
            navigate("/signin");
          }, 5000);
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
      }

      if (auth.prevStep === "signup" || auth.prevStep === "signin") {
        try {
          const { isSignUpComplete } = await confirmSignUp({
            username: auth.email,
            confirmationCode: verificationCode,
          });
          if (isSignUpComplete) {
            setErrorMessage("");
            setSuccessMessage(
              "Sign up confirmed. You will be redirected to login in 5 seconds...",
            );
            setTimeout(() => {
              navigate("/signin");
            }, 5000);
          } else {
            setErrorMessage("Error confirming sign up. Please try again.");
          }
        } catch (error) {
          console.error("Error confirming sign up: ", error);
          setErrorMessage("Error confirming sign up. Please try again.");
        }
      }
    } else {
      setErrorMessage("Verification code must be 6 digits long.");
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
        setSuccessMessage("Code has been resent.");
      } catch (error) {
        console.error("Error sending forgot password: ", error);
        setErrorMessage("Error sending forgot password. Please try again.");
      }
    }

    if (auth.prevStep === "signup" || auth.prevStep === "signin") {
      try {
        await resendSignUpCode({ username: auth.email });
        setErrorMessage("");
        setSuccessMessage("Code has been resent.");
      } catch (error) {
        console.error("Error resending verification code: ", error);
        setSuccessMessage("");
        setErrorMessage("Error resending verification code. Please try again.");
      }
    }
  };

  return (
    <>
      <div>Enter verification code</div>
      <div className="single-line">
        <div>{`I don't have the code?`}</div>
        <Link onClick={resendCode}>Resend code</Link>
      </div>
      <div className="confirmcode-inputs">
        {[0, 1, 2, 3, 4, 5].map(num => (
          <input
            key={num}
            type="text"
            maxLength={1}
            ref={ref => (inputRefs.current[num] = ref)}
            onKeyUp={e => handleBackspaceAndEnter(e, num)}
            onChange={e => handleChange(e, num)}
          />
        ))}
      </div>
      {auth.prevStep === "forgotpassword" && (
        <>
          <FormInput
            placeholder="New password"
            isPassword={true}
            value={newPassword}
            onChange={setNewPassword}
            autoComplete="new-password"
          />
        </>
      )}
      {successMessage && <div>{successMessage}</div>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Button type="primary" onClick={verifyCode}>
        Verify
      </Button>
    </>
  );
}
