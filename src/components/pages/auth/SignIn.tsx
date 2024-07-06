import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";
import Link from "antd/es/typography/Link";
import { Amplify } from "aws-amplify";
import { fetchAuthSession, resendSignUpCode, signIn, signOut } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { createUserApi, getUserInfoApi } from "../../../api/authAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import awsExports from "../../../aws-exports";
import { Role } from "../../../consts/consts";
import { UserInfo } from "../../../model/apiModels";
import { updateAuthState, updateRole } from "../../../reducers/authSlice";
import { signOutCurrentUser, startTokenExpirationTimer } from "../../../utils/authUtils";
import { validateEmail, validatePassword } from "../../../utils/validators";
import { ErrorMessage, QText } from "../../common/Fonts";
import { FormInput } from "../../form/fields/Controls";
import { AuthComponent } from "./AuthComponent";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";
import { sessionStorage } from "aws-amplify/utils";

export function SignIn() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showFormInputErrorMessage, setShowFormInputErrorMessage] = useState(false);

  const role = useAppSelector(state => state.auth.role);

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

      const userPoolConfig = role === Role.LAWYER ? awsExports.LAWYER_POOL : awsExports.CUSTOMER_POOL;
      Amplify.configure({
        Auth: {
          Cognito: {
            userPoolId: userPoolConfig.USER_POOL_ID,
            userPoolClientId: userPoolConfig.USER_POOL_APP_CLIENT_ID,
          },
        },
      });

      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password,
      });

      if (isSignedIn) {
        const session = await fetchAuthSession();
        if (!session || !session.tokens || !session.tokens.accessToken) {
          throw new Error("Failed to fetch session after sign in");
        }
        console.log("Session after sign in:", session); // Log session to debug
        const accessToken = session.tokens.accessToken.toString();

        let userInfo: UserInfo;
        try {
          userInfo = await getUserInfoApi(email, accessToken, role);
          console.log("User Info:", userInfo); // Log userInfo to debug
        } catch (error: any) {
          if (error?.message === "USE_NOT_FOUND") {
            await createUserApi(email, accessToken, role);
            userInfo = await getUserInfoApi(email, accessToken, role);
            console.log("User Info after creation:", userInfo); // Log userInfo to debug
          } else {
            throw error;
          }
        }

        console.log(`Dispatching auth state for role: ${role}`, userInfo); // Add more logging

        dispatch(
          updateAuthState({
            userId: userInfo?.id || undefined,
            isLawyer: role === Role.LAWYER,
            isLoggedIn: true,
            email,
            accessToken: accessToken,
            role: role,
          }),
        );

        startTokenExpirationTimer(dispatch);
        cognitoUserPoolsTokenProvider.setKeyValueStorage(sessionStorage);

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
      <div className="auth-toggle">
        <QText>{t("IAmLawyer")}</QText>
        <Switch
          checked={role === Role.LAWYER}
          onChange={checked => {
            const roleValue = checked ? Role.LAWYER : Role.APPLICANT;
            dispatch(updateRole(roleValue));
          }}
        />
      </div>

      <FormInput
        placeholder={t("Email")}
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
      <Link onClick={() => navigate("/forgotpassword")}>{t("ForgotPassword")}</Link>
      <Button type="primary" onClick={loginUser}>
        {t("Login")}
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
        By signing up, I agree to the QuickImmi&apos;s Privacy Statement and Terms of Service.
      </QText>
    </>
  );

  return (
    <AuthComponent
      formHeader={t("Login")}
      form={form}
      actions={actions}
      error={error}
      bottomTop={bottomTop}
      bottomBottom={bottomBottom}
    />
  );
}
