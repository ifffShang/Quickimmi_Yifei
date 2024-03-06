import { Button } from "antd";
import React, { useEffect, useState } from "react";
import Link from "antd/es/typography/Link";
import { openModal } from "../../reducers/commonSlice";
import { FormInput } from "../../components/common/Controls";
import { useTranslation } from "react-i18next";
import { login } from "../../api/authAPI";
import { ErrorMessage } from "../../components/common/Fonts";
import { useAppDispatch } from "../../app/hooks";

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

  const loginUser = () => {
    login(email, password)
      .then(response => {
        console.log("Login response: ", response);
      })
      .catch(error => {
        console.log("Error logging in: ", error);
        if (error.message === "USER_PASSWORD_OR_USERNAME_IS_WRONG") {
          setErrorMessage("Username or password is wrong.");
          return;
        }
        setErrorMessage("Cannot login with provided credentials.");
      });
  };

  return (
    <>
      <div>Login</div>
      <FormInput placeholder={t("Email")} value={email} onChange={setEmail} />
      <FormInput
        placeholder={t("Password")}
        value={password}
        onChange={setPassword}
        isPassword={true}
      />
      <Link>Forgot Password?</Link>
      <Button type="primary" onClick={loginUser}>
        Login
      </Button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <div className="single-line">
        <div>{"Doesn't have account?"}</div>
        <Link onClick={signup}>Sign Up</Link>
      </div>
      <div>Every user has five times of consulting AI</div>
    </>
  );
}
