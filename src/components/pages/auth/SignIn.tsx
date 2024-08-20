import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";
import Link from "antd/es/typography/Link";
import { Amplify } from "aws-amplify";
import { fetchAuthSession, resendSignUpCode, signIn } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { createUserApi, getUserInfoApi, getLawyerInfoApi, createNewLawyerApi } from "../../../api/authAPI";
import { useAppDispatch } from "../../../app/hooks";
import awsExports from "../../../aws-exports";
import { Role } from "../../../consts/consts";
import { UserInfo, LawyerInfo } from "../../../model/apiModels";
import { updateAuthState } from "../../../reducers/authSlice";
import { signOutCurrentUser, startTokenExpirationTimer } from "../../../utils/authUtils";
import { validateEmail, validatePassword } from "../../../utils/validators";
import { ErrorMessage, QText } from "../../common/Fonts";
import { FormInput } from "../../form/fields/Controls";
import { AuthComponent } from "./AuthComponent";

export function SignIn() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showFormInputErrorMessage, setShowFormInputErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<Role>(Role.LAWYER);

  useEffect(() => {
    setShowFormInputErrorMessage(false);
    setErrorMessage("");
  }, [email, password]);

  // Configure Amplify when the role changes
  useEffect(() => {
    // const userPoolConfig = role === Role.LAWYER ? awsExports.LAWYER_POOL : awsExports.CUSTOMER_POOL;
    const userPoolConfig = awsExports.LAWYER_POOL;
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: userPoolConfig.USER_POOL_ID,
          userPoolClientId: userPoolConfig.USER_POOL_APP_CLIENT_ID,
        },
      },
    });
  }, [role]);

  const loginUser = async () => {
    try {
      setIsLoading(true);
      if (validateEmail(email) !== "" || validatePassword(password) !== "") {
        setShowFormInputErrorMessage(true);
        setIsLoading(false);
        return;
      }

      const signInUser = async () => {
        const { isSignedIn, nextStep } = await signIn({
          username: email,
          password,
        });

        if (isSignedIn) {
          const session = await fetchAuthSession();
          if (
            !session ||
            !session.tokens ||
            !session.tokens.accessToken ||
            !session.tokens.accessToken.payload ||
            !session.tokens.accessToken.payload.username
          ) {
            throw new Error("Failed to fetch session after sign in");
          }
          const accessToken = session.tokens.accessToken.toString();

          let userInfo: UserInfo | LawyerInfo;
          try {
            if (role === Role.LAWYER) {
              userInfo = await getLawyerInfoApi(email, accessToken, role);
            } else {
              userInfo = await getUserInfoApi(email, accessToken, role);
            }
          } catch (error: any) {
            if (error?.message === "USE_NOT_FOUND") {
              if (role === Role.LAWYER) {
                const cognitoId = session.tokens.accessToken.payload.username;
                await createNewLawyerApi(cognitoId.toString(), email, accessToken, role);
                userInfo = await getLawyerInfoApi(email, accessToken, role);
              } else {
                await createUserApi(email, accessToken, role);
                userInfo = await getUserInfoApi(email, accessToken, role);
              }
            } else {
              throw error;
            }
          }

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

          startTokenExpirationTimer(dispatch, true);

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
      };

      try {
        await signInUser();
      } catch (error: any) {
        if (error?.name === "UserAlreadyAuthenticatedException") {
          signOutCurrentUser(dispatch);
          await signInUser();
        } else {
          throw error;
        }
      }
    } catch (error: any) {
      if (error?.message === "Incorrect username or password.") {
        setErrorMessage(t("ErrorMessage.IncorrectEmailOrPassword"));
        setIsLoading(false);
        return;
      }
      console.error("Error signing in: ", error);
      setErrorMessage(t("ErrorMessage.ErrorSigningIn"));
      signOutCurrentUser(dispatch);
      setIsLoading(false);
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
            setRole(roleValue);
            localStorage.setItem("userRole", roleValue);
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
      <Button type="primary" onClick={loginUser} loading={isLoading}>
        {t("Login")}
      </Button>
    </>
  );

  const error = errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>;

  const bottomTop = (
    <>
      <QText>{t("Doesn't have account?")}</QText>
      <Link onClick={() => navigate("/signup")}>Sign Up</Link>
      {/*<QText>{t("Contact contact@quickimmi.ai to sign up")}</QText>*/}
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
