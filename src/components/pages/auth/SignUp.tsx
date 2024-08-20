import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "antd/es/typography/Link";
import { Amplify } from "aws-amplify";
import { resendSignUpCode, signUp } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import awsExports from "../../../aws-exports";
import { updateAuthState } from "../../../reducers/authSlice";
import { validateEmail, validatePassword, validatePasswordConfirmation } from "../../../utils/validators";
import { ErrorMessage, QText } from "../../common/Fonts";
import { FormInput } from "../../form/fields/Controls";
import { AuthComponent } from "./AuthComponent";
import { Role } from "../../../consts/consts";

export function SignUp() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showFormInputErrorMessage, setShowFormInputErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const role = useAppSelector(state => state.auth.role);

  useEffect(() => {
    setShowFormInputErrorMessage(false);
    setErrorMessage("");
  }, [email, password]);

  // Configure Amplify with the user pool based on the role
  // useEffect(() => {
  //   let userPoolConfig: any;
  //   if (role === Role.LAWYER) {
  //     userPoolConfig = awsExports.LAWYER_POOL;
  //   } else {
  //     userPoolConfig = awsExports.CUSTOMER_POOL;
  //   }
  //
  //   Amplify.configure({
  //     Auth: {
  //       Cognito: {
  //         userPoolId: userPoolConfig.USER_POOL_ID,
  //         userPoolClientId: userPoolConfig.USER_POOL_APP_CLIENT_ID,
  //       },
  //     },
  //   });
  // }, [role]);

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
          resendSignUpCode({ username: email }).then(() => {
            dispatch(
              updateAuthState({
                prevStep: "signup",
                email,
              }),
            );
            navigate("/confirmcode");
          });
          return;
        }
        setErrorMessage("There was an error signing up. Please try again later.");
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
      <QText>Already a member?</QText>
      <Link onClick={() => navigate("/signin")}>Login in</Link>
    </>
  );

  const bottomBottom = (
    <QText color="secondary">
      By signing up, I agree to the QuickImmi&apos;s Privacy Statement and Terms of Service.
    </QText>
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
