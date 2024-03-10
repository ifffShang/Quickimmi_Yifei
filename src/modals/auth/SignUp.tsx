import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../reducers/authSlice";
import { resendVerificationCode, signUp } from "../../api/authAPI";
import { validateEmail, validatePassword } from "../../utils/validators";
import { useTranslation } from "react-i18next";
import { FormInput } from "../../components/common/Controls";
import Link from "antd/es/typography/Link";
import { ErrorMessage } from "../../components/common/Fonts";

export function SignUp() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setShowErrorMessage(false);
    setErrorMessage("");
  }, [email, password]);

  const signup = () => {
    if (!validateEmail(email) || !validatePassword(password)) {
      setShowErrorMessage(true);
      return;
    }

    signUp(email, password)
      .then(response => {
        dispatch(
          openModal({
            modalType: "confirmcode",
            email,
          }),
        );
        console.log("Sign up response: ", response);
      })
      .catch(error => {
        // If user already signed up but didn't verify the code, resend code and redirect to verification code modal
        if (error.message === "WAITING_FOR_VERIFICATION_CODE") {
          resendVerificationCode(email)
            .then(response => {
              console.log("Resend verification code response: ", response);
              dispatch(
                openModal({
                  modalType: "confirmcode",
                  email,
                  prevStep: "signup",
                }),
              );
            })
            .catch(error => {
              console.log("Error resending verification code: ", error);
              setErrorMessage(
                "There was an error signing up.  Please try again later.",
              );
            });
          return;
        }
        console.log("Error signing up: ", error);
        setErrorMessage(
          "There was an error signing up. Please try again later.",
        );
      });
  };

  const openSignInModal = () => {
    dispatch(openModal({ modalType: "signin" }));
  };

  return (
    <>
      <div>Sign up</div>
      <FormInput
        placeholder={t("Email")}
        value={email}
        errorMessage={t("ErrorMessage.InvalidEmailFormat")}
        onChange={setEmail}
        validate={validateEmail}
        showErrorMessage={showErrorMessage}
        isRequired={true}
      />
      <FormInput
        placeholder={t("Password")}
        value={password}
        errorMessage={t("ErrorMessage.InvalidPasswordFormat")}
        onChange={setPassword}
        validate={validatePassword}
        showErrorMessage={showErrorMessage}
        isPassword={true}
        isRequired={true}
      />
      <div className="single-line">
        <div>Already a member?</div>
        <Link onClick={openSignInModal}>Login in</Link>
      </div>
      <Button type="primary" onClick={signup}>
        Sign up
      </Button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </>
  );
}
