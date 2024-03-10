import React, { useRef, useState } from "react";
import { ErrorMessage } from "../../components/common/Fonts";
import { Button } from "antd";
import {
  confirmPasswordReset,
  confirmSignUp,
  forgotPassword,
  resendVerificationCode,
} from "../../api/authAPI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./ConfirmCode.css";
import { openModal } from "../../reducers/authSlice";
import Link from "antd/es/typography/Link";
import { FormInput } from "../../components/common/Controls";

export function ConfirmCode() {
  const dispatch = useAppDispatch();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [email, setEmail] = useState("");
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

  const verifyCode = () => {
    const verificationCode = code.join("");
    if (!auth.email) {
      setErrorMessage("Email is not set.");
      return;
    }
    if (verificationCode.length === 6) {
      if (auth.prevStep === "forgotpassword") {
        confirmPasswordReset(email, verificationCode, newPassword)
          .then(response => {
            console.log("Password is reset: ", response);
            setErrorMessage("");
            setSuccessMessage(
              "Password is reset successfully. You will be redirected to login in 5 seconds...",
            );
            setTimeout(() => {
              dispatch(openModal({ modalType: "signin" }));
            }, 5000);
          })
          .catch(error => {
            console.error("Error confirming password reset: ", error);
            setErrorMessage(
              "Error confirming password reset. Please try again.",
            );
          });
      }

      if (auth.prevStep === "signup") {
        confirmSignUp(auth.email, verificationCode)
          .then(response => {
            console.log("Confirm sign up response: ", response);
            setErrorMessage("");
            setSuccessMessage(
              "Sign up confirmed. You will be redirected to login in 5 seconds...",
            );
            setTimeout(() => {
              dispatch(openModal({ modalType: "signin" }));
            }, 5000);
          })
          .catch(error => {
            console.error("Error confirming sign up: ", error);
            setErrorMessage("Error confirming sign up. Please try again.");
          });
      }
    } else {
      setErrorMessage("Verification code must be 6 digits long.");
    }
  };

  const resendCode = () => {
    if (!auth.email) {
      setErrorMessage("Email is not set.");
      return;
    }

    if (auth.prevStep === "forgotpassword") {
      forgotPassword(auth.email)
        .then(response => {
          console.log("Forgot password response: ", response);
          setErrorMessage("");
          setSuccessMessage("Code has been resent.");
        })
        .catch(error => {
          console.error("Error sending forgot password: ", error);
          setSuccessMessage("");
          setErrorMessage("Error sending forgot password. Please try again.");
        });
    }

    if (auth.prevStep === "signup") {
      resendVerificationCode(auth.email)
        .then(response => {
          console.log("Resend verification code response: ", response);
          setErrorMessage("");
          setSuccessMessage("Code has been resent.");
        })
        .catch(error => {
          console.error("Error resending verification code: ", error);
          setSuccessMessage("");
          setErrorMessage(
            "Error resending verification code. Please try again.",
          );
        });
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
            placeholder="Email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
          />
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
