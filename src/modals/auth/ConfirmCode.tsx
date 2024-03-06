import React, { useRef, useState } from "react";
import { ErrorMessage } from "../../components/common/Fonts";
import { Button } from "antd";
import { confirmSignUp, resendVerificationCode } from "../../api/authAPI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./ConfirmCode.css";
import { openModal } from "../../reducers/commonSlice";
import Link from "antd/es/typography/Link";

export function ConfirmCode() {
  const dispatch = useAppDispatch();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const inputRefs = useRef<any[]>([]);

  const email = useAppSelector(state => state.common.userData.email);

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
    if (!email) {
      setErrorMessage("Email is not set.");
      return;
    }
    if (verificationCode.length === 6) {
      confirmSignUp(email, verificationCode)
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
    } else {
      setErrorMessage("Verification code must be 6 digits long.");
    }
  };

  const resendCode = () => {
    if (!email) {
      setErrorMessage("Email is not set.");
      return;
    }
    resendVerificationCode(email)
      .then(response => {
        console.log("Resend verification code response: ", response);
        setSuccessMessage("Code has been resent.");
      })
      .catch(error => {
        console.error("Error resending verification code: ", error);
        setErrorMessage("Error resending verification code. Please try again.");
      });
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
      {successMessage && <div>{successMessage}</div>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Button type="primary" onClick={verifyCode}>
        Verify
      </Button>
    </>
  );
}
