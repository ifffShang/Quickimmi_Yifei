import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "antd/es/typography/Link";
import { signUp } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { updateAuthState } from "../../../reducers/authSlice";
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
} from "../../../utils/validators";
import { FormInput } from "../../common/Controls";
import { ErrorMessage } from "../../common/Fonts";
import { Text } from "../../common/Fonts";
import { AuthComponent } from "./AuthComponent";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showFormInputErrorMessage, setShowFormInputErrorMessage] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setShowFormInputErrorMessage(false);
    setErrorMessage("");
  }, [email, password]);

  const signUpButtonOnClick = async () => {
    if (
      validateEmail(email) !== "" ||
      validatePassword(password) !== "" ||
      validatePasswordConfirmation(password, confirmPassword) !== ""
    ) {
      setShowFormInputErrorMessage(true);
      return;
    }

    signUp({ username: email, password })
      .then(({ nextStep }) => {
        if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
          dispatch(
            updateAuthState({
              prevStep: "signup",
              email,
            }),
          );
          navigate("/confirmcode");
          return;
        } else if (nextStep.signUpStep === "DONE") {
          navigate("/signin");
          return;
        }
      })
      .catch(error => {
        console.error("Error signing up: ", error);
        if (error.name === "UsernameExistsException") {
          setErrorMessage("User already exists. Please sign in.");
          return;
        }
        setErrorMessage(
          "There was an error signing up. Please try again later.",
        );
      });
  };

  const form = (
    <>
      <FormInput
        placeholder={t("Email address")}
        value={email}
        icon={<MailOutlined className="site-form-item-icon" />}
        onChange={setEmail}
        validate={validateEmail}
        showErrorMessage={showFormInputErrorMessage}
        autoComplete="new-email"
      />
      <FormInput
        placeholder={t("Password")}
        value={password}
        icon={<LockOutlined className="site-form-item-icon" />}
        onChange={setPassword}
        validate={validatePassword}
        showErrorMessage={showFormInputErrorMessage}
        isPassword={true}
        autoComplete="new-password"
      />
      <FormInput
        placeholder={t("Confirm password")}
        value={confirmPassword}
        icon={<LockOutlined className="site-form-item-icon" />}
        onChange={setConfirmPassword}
        validate={() => validatePasswordConfirmation(password, confirmPassword)}
        showErrorMessage={showFormInputErrorMessage}
        isPassword={true}
        autoComplete="new-password"
      />
    </>
  );

  const actions = (
    <>
      <Button type="primary" onClick={signUpButtonOnClick}>
        Sign up
      </Button>
    </>
  );

  const bottomTop = (
    <>
      <Text>Already a member?</Text>
      <Link onClick={() => navigate("/signin")}>Login in</Link>
    </>
  );

  const bottomBottom = (
    <Text color="secondary">
      By signing up, I agree to the QuickImmi&apos;s Privacy Statement and Terms
      of Service.
    </Text>
  );

  const error = errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>;

  return (
    <AuthComponent
      formHeader={t("SignUp")}
      form={form}
      actions={actions}
      error={error}
      bottomTop={bottomTop}
      bottomBottom={bottomBottom}
    />
  );
}
