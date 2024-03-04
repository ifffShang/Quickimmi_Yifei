import { Button, Input } from "antd";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import Link from "antd/es/typography/Link";
import { openModal } from "../../reducers/commonSlice";

export function SignIn() {
  const dispatch = useDispatch();

  const signup = useCallback(() => {
    dispatch(openModal("signup"))
  }, []);

  return (
    <>
      <div>Login</div>
      <Input placeholder="Username" />
      <Input placeholder="Password" />
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