import { Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../reducers/commonSlice";
//import { signUp } from "../../api/authAPI";
import { validateEmail, validatePassword } from "../../utils/validators";
import { useTranslation } from "react-i18next";
import { FormInput } from "../../components/common/Controls";
import Link from "antd/es/typography/Link";

export function SignUp() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    setShowErrorMessage(false);
  }, [email, password, phoneNumber]);

  const signup = useCallback(() => {
    if (!validateEmail(email) || !validatePassword(password)) {
      setShowErrorMessage(true);
      return;
    }
    dispatch(openModal("confirmcode"));
    // signUp(email, password, phoneNumber).then(response => {
    //   dispatch(openModal("confirmcode"));
    //   console.log("Sign up response: ", response);
    // });
  }, [email, password, phoneNumber]);

  const openSignInModal = useCallback(() => {
    dispatch(openModal("signin"));
  }, []);

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
        placeholder={t("PhoneNumber")} 
        value={phoneNumber} 
        onChange={setPhoneNumber} 
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
    </>
  );
}
