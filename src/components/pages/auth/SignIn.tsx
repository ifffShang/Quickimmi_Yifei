import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "antd/es/typography/Link";
import { fetchAuthSession, resendSignUpCode, signIn } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { createUserApi, getUserInfoApi } from "../../../api/authAPI";
import { useAppDispatch } from "../../../app/hooks";
import { updateAuthState } from "../../../reducers/authSlice";
import { signOutCurrentUser } from "../../../utils/authUtils";
import { validateEmail, validatePassword } from "../../../utils/validators";
import { ErrorMessage, QText } from "../../common/Fonts";
import { FormInput } from "../../form/fields/Controls";
import { AuthComponent } from "./AuthComponent";
import { UserInfo } from "../../../model/apiModels";

export function SignIn() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showFormInputErrorMessage, setShowFormInputErrorMessage] =
    useState(false);

  useEffect(() => {
    setShowFormInputErrorMessage(false);
    setErrorMessage("");
  }, [email, password]);

  const loginUser = async () => {
    try {
      if (validateEmail(email) !== "" || validatePassword(password) !== "") {
        setShowFormInputErrorMessage(true);
        return;
      }
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password,
      });
      if (isSignedIn) {
        const session = await fetchAuthSession();
        if (!session || !session.tokens || !session.tokens.accessToken) {
          throw new Error("Failed to fetch session after sign in");
        }
        const accessToken = session.tokens.accessToken.toString();
        let userInfo: UserInfo;
        try {
          userInfo = await getUserInfoApi(email, accessToken);
        } catch (error: any) {
          if (error?.message === "USE_NOT_FOUND") {
            await createUserApi(email, accessToken);
            userInfo = await getUserInfoApi(email, accessToken);
          } else {
            throw error;
          }
        }
        dispatch(
          updateAuthState({
            userId: userInfo?.id || 0,
            isLoggedIn: true,
            email,
            accessToken: accessToken,
          }),
        );
        navigate("/dashboard");
      } else if (nextStep?.signInStep === "CONFIRM_SIGN_UP") {
        await resendSignUpCode({ username: email });
        dispatch(
          updateAuthState({
            prevStep: "signin",
            email,
          }),
        );
        navigate("/signup");
      }
    } catch (error: any) {
      if (error?.message === "Incorrect username or password.") {
        setErrorMessage(t("ErrorMessage.IncorrectEmailOrPassword"));
        return;
      }
      if (error?.name === "UserAlreadyAuthenticatedException") {
        signOutCurrentUser(dispatch);
      }
      console.error("Error signing in: ", error);
      setErrorMessage(t("ErrorMessage.ErrorSigningIn"));
      signOutCurrentUser(dispatch);
    }
  };

  const form = (
    <>
      <FormInput
        placeholder={t("Email address")}
        value={email}
        onChange={setEmail}
        validate={validateEmail}
        showErrorMessage={showFormInputErrorMessage}
        autoComplete="email"
        icon={<MailOutlined className="site-form-item-icon" />}
      />
      <FormInput
        placeholder={t("Password")}
        value={password}
        onChange={setPassword}
        validate={validatePassword}
        showErrorMessage={showFormInputErrorMessage}
        isPassword={true}
        autoComplete="password"
        icon={<LockOutlined className="site-form-item-icon" />}
      />
    </>
  );

  const actions = (
    <>
      <Link onClick={() => navigate("/forgotpassword")}>Forgot Password?</Link>
      <Button type="primary" onClick={loginUser}>
        Login
      </Button>
    </>
  );

  const error = errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>;

  const bottomTop = (
    <>
      <QText>{"Doesn't have account?"}</QText>
      <Link onClick={() => navigate("/signup")}>Sign Up</Link>
    </>
  );

  const bottomBottom = (
    <>
      <QText color="secondary">
        By signing up, I agree to the QuickImmi&apos;s Privacy Statement and
        Terms of Service.
      </QText>
    </>
  );

  return (
    <AuthComponent
      formHeader="Sign In"
      form={form}
      actions={actions}
      error={error}
      bottomTop={bottomTop}
      bottomBottom={bottomBottom}
    />
  );
}
