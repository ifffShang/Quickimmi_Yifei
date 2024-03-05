import { Button } from "antd";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "antd/es/typography/Link";
import { openModal } from "../../reducers/commonSlice";
import { FormInput } from "../../components/common/Controls";
import { useTranslation } from "react-i18next";

export function SignIn() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = useCallback(() => {
    dispatch(openModal("signup"));
  }, []);

  return (
    <>
      <div>Login</div>
      <FormInput
        placeholder={t("Email")}
        value={email}
        onChange={setEmail}
      />
      <FormInput
        placeholder={t("Password")}
        value={password}
        onChange={setPassword}
      />
      <Link>Forgot Password?</Link>
      <Button type="primary">Login</Button>
      <div className="single-line">
        <div>{"Doesn't have account?"}</div>
        <Link onClick={signup}>Sign Up</Link>
      </div>
      <div>Every user has five times of consulting AI</div>
    </>
  );
}
