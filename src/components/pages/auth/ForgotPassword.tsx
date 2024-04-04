import { MailOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "antd/es/typography/Link";
import { resetPassword } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { updateAuthState } from "../../../reducers/authSlice";
import { FormInput } from "../../common/Controls";
import { ErrorMessage, QText } from "../../common/Fonts";
import { AuthComponent } from "./AuthComponent";
import { validateEmail } from "../../../utils/validators";

export function ForgotPassword() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showFormInputErrorMessage, setShowFormInputErrorMessage] =
    useState(false);

  useEffect(() => {
    setShowFormInputErrorMessage(false);
    setErrorMessage("");
  }, [email]);

  const forgotPasswordLinkClick = async () => {
    try {
      if (validateEmail(email) !== "") {
        setShowFormInputErrorMessage(true);
        return;
      }
      const { nextStep } = await resetPassword({ username: email });
      if (nextStep.resetPasswordStep === "CONFIRM_RESET_PASSWORD_WITH_CODE") {
        dispatch(
          updateAuthState({
            prevStep: "forgotpassword",
            email,
          }),
        );
        navigate("/confirmcode");
      } else {
        console.log("Successfully reset password: ", nextStep);
      }
    } catch (error) {
      console.error("Error sending forgot password: ", error);
      setErrorMessage("Error sending forgot password.");
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
        autoComplete="new-email"
        icon={<MailOutlined className="site-form-item-icon" />}
      />
    </>
  );

  const actions = (
    <>
      <Button type="primary" onClick={forgotPasswordLinkClick}>
        Next
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
      formHeader="Forgot Password?"
      form={form}
      actions={actions}
      error={error}
      bottomTop={bottomTop}
      bottomBottom={bottomBottom}
    />
  );
}
