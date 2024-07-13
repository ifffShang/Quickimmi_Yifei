import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { AuthComponent } from "./AuthComponent";
import "./ConfirmCode.css";

export function AuthSuccess() {
  const auth = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  let message = "";
  let header = "";

  if (auth.prevStep === "forgotpassword") {
    message = "You've successfully reset your password. Redirecting you to sign in page in 5 seconds...";
    header = "Password reset successfully!";
  }

  if (auth.prevStep === "signup" || auth.prevStep === "signin") {
    message = "You've successfully signed up. Redirecting you to sign in page in 5 seconds...";
    header = "Sign up successful!";
  }

  useEffect(() => {
    setTimeout(() => {
      navigate("/signin");
    }, 5000);
  }, []);

  const form = (
    <>
      <div>{message}</div>
    </>
  );

  return (
    <AuthComponent formHeader={header} form={form} actions={null} error={null} bottomTop={null} bottomBottom={null} />
  );
}
