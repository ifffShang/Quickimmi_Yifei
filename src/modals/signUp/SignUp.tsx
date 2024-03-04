import { Button, Input } from "antd";
import Link from "antd/es/typography/Link";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../reducers/commonSlice";
import { signUp } from "../../api/authAPI";
import { ErrorMessage } from "../../components/common/Fonts";
import { validatePassword } from "../../utils/utils";

export function SignUp() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [hasErrorMessage, setHasErrorMessage] = useState(false);

  useEffect(() => {
    if (!email || !password || !phoneNumber) {
      setIsButtonDisabled(true);
      return;
    }
    setIsButtonDisabled(false);
  }, [email, password, phoneNumber]);

  const signup = useCallback(() => {
    if (!validatePassword(password)) {
      setHasErrorMessage(true);
      return;
    }
    setHasErrorMessage(false);

    signUp(email, password, phoneNumber).then(response => {
      console.log(response);
    });

    dispatch(openModal("signin"));
  }, [email, password, phoneNumber]);

  return (
    <>
      <div>Sign up</div>
      <Input placeholder="Email" onChange={(e) => { setEmail(e.currentTarget.value) }} />
      <Input placeholder="Phone Number" onChange={(e) => { setPhoneNumber(e.currentTarget.value) }} />
      <Input placeholder="Password" onChange={(e) => setPassword(e.currentTarget.value)} />
      <div className="single-line">
        <div>Already a member?</div>
        <Link onClick={signup}>Login in</Link>
      </div>
      <Button type="primary"
        onClick={signup}
        disabled={isButtonDisabled}>
        Sign up
      </Button>
      {hasErrorMessage && <ErrorMessage>
        Password must be at least 8 characters, and contain at least 1 number, 1 uppercase letter, and 1 lowercase letter
      </ErrorMessage>}
    </>
  );
}