import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "antd/es/typography/Link";
import { signUp } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { openModal } from "../../../reducers/authSlice";
import { validateEmail, validatePassword } from "../../../utils/validators";
import { FormInput } from "../../common/Controls";
import { ErrorMessage } from "../../common/Fonts";
import { Text } from "../../common/Fonts";
import { AuthComponent } from "./AuthComponent";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setShowErrorMessage(false);
    setErrorMessage("");
  }, [email, password]);

  const signUpButtonOnClick = async () => {
    if (!validateEmail(email) || !validatePassword(password)) {
      setShowErrorMessage(true);
      return;
    }

    signUp({ username: email, password })
      .then(({ nextStep }) => {
        if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
          dispatch(
            openModal({
              modalType: "confirmcode",
              email,
            }),
          );
          return;
        }
        if (nextStep.signUpStep === "DONE") {
          dispatch(openModal({ modalType: "signin" }));
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
        errorMessage={t("ErrorMessage.InvalidEmailFormat")}
        onChange={setEmail}
        validate={validateEmail}
        showErrorMessage={showErrorMessage}
      />
      <FormInput
        placeholder={t("Password")}
        value={password}
        icon={<LockOutlined className="site-form-item-icon" />}
        errorMessage={t("ErrorMessage.InvalidPasswordFormat")}
        onChange={setPassword}
        validate={validatePassword}
        showErrorMessage={showErrorMessage}
        isPassword={true}
      />
      <FormInput
        placeholder={t("Confirm password")}
        value={password}
        icon={<LockOutlined className="site-form-item-icon" />}
        errorMessage={t("ErrorMessage.InvalidPasswordFormat")}
        onChange={setPassword}
        validate={validatePassword}
        showErrorMessage={showErrorMessage}
        isPassword={true}
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
      <Link onClick={() => navigation("/signin")}>Login in</Link>
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
