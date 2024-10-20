import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";
import { Amplify } from "aws-amplify";
import { fetchAuthSession, resendSignUpCode, signIn } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { createNewLawyerApi, createUserApi, getLawyerInfoApi, getUserInfoApi } from "../../../api/authAPI";
import { useAppDispatch } from "../../../app/hooks";
import { Role } from "../../../consts/consts";
import { LawyerInfo, UserInfo } from "../../../model/apiModels";
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
    const userPoolId =
      role === Role.LAWYER ? process.env.REACT_APP_LAWYER_POOL_ID : process.env.REACT_APP_CUSTOMER_POOL_ID;
    const userPoolClientId =
      role === Role.LAWYER
        ? process.env.REACT_APP_LAWYER_POOL_APP_CLIENT_ID
        : process.env.REACT_APP_CUSTOMER_POOL_APP_CLIENT_ID;

    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: userPoolId!,
          userPoolClientId: userPoolClientId!,
        },
      },
    });
  }, [role]);

  const loginUser = async () => {
    try {
      setIsLoading(true);
      if (validateEmail(email) !== "") {
        setShowFormInputErrorMessage(true);
        setIsLoading(false);
        return;
      }

      // Check if there is already a signed-in user
      const currentSession = await fetchAuthSession();
      if (currentSession) {
        console.log("User already signed in.");
        await signOutCurrentUser(dispatch);
      }

      const { isSignedIn, nextStep } = await signIn({ username: email, password });

      if (isSignedIn) {
        const session = await fetchAuthSession();
        if (
          !session?.tokens?.accessToken?.payload ||
          !session.tokens.accessToken.payload.username ||
          !session.tokens.accessToken.payload.exp
        ) {
          throw new Error("Failed to fetch session after sign in");
        }
        const accessToken = session.tokens.accessToken.toString();
        const cognitoId = session.tokens.accessToken.payload.username.toString();
        const tokenExpiration = session.tokens.accessToken.payload.exp * 1000; // Convert seconds to milliseconds
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
              await createNewLawyerApi(cognitoId, email, accessToken, role);
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
            email,
            accessToken: accessToken,
            role: role,
            tokenExpiration: tokenExpiration,
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
    } catch (error: any) {
      if (error?.message === "Incorrect username or password.") {
        setErrorMessage(t("ErrorMessage.IncorrectEmailOrPassword"));
        setIsLoading(false);
        return;
      }
      console.error("Error signing in: ", error);
      setErrorMessage(t("ErrorMessage.ErrorSigningIn"));
      await signOutCurrentUser(dispatch);
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
      <Button type="link" onClick={() => navigate("/forgotpassword")}>
        {t("ForgotPassword")}
      </Button>
      <Button type="primary" onClick={loginUser} loading={isLoading}>
        {t("Login")}
      </Button>
    </>
  );

  const error = errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>;

  const bottomTop = (
    <>
      <QText>{t("Doesn't have account?")}</QText>
      {/*<Link onClick={() => navigate("/signup")}>Sign Up</Link>*/}
      <QText>{t("Contact contact@quickimmi.ai to sign up")}</QText>
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
