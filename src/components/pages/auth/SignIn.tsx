import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";
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
import awsExports from "../../../aws-exports"; 
import { Amplify } from "aws-amplify";


export function SignIn() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showFormInputErrorMessage, setShowFormInputErrorMessage] = useState(false);
  const [role, setRole] = useState("customer");

  useEffect(() => {
    setShowFormInputErrorMessage(false);
    setErrorMessage("");
  }, [email, password]);

  // Configure Amplify with the user pool based on the role
  useEffect(() => {
    let userPoolConfig;
    if (role === "lawyer") {
      userPoolConfig = awsExports.LAWYER_POOL;
    } else {
      userPoolConfig = awsExports.CUSTOMER_POOL;
    }
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
            userId: role === "customer" ? userInfo?.id || 0 : undefined,
            lawyerId: role === "lawyer" ? userInfo?.id || 0 : undefined,
            isLoggedIn: true,
            email,
            accessToken: accessToken,
            role: role,
          })
        );
        navigate("/dashboard");
      } else if (nextStep?.signInStep === "CONFIRM_SIGN_UP") {
        await resendSignUpCode({ username: email });
        dispatch(
          updateAuthState({
            prevStep: "signin",
            email,
            role: role, 
          })
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
        <QText>{t("I am a Lawyer")}</QText>
        <Switch checked={role === "lawyer"} onChange={() => setRole(role === "customer" ? "lawyer" : "customer")} />
        {/* <Checkbox
        checked={role === "lawyer"}
        onChange={() => setRole(role === "customer" ? "lawyer" : "customer")}
        className="auth-checkbox"
        >
      </Checkbox> */}
      </div>

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
