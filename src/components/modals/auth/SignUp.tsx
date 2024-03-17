import { Button } from "antd";
import Link from "antd/es/typography/Link";
import { getCurrentUser, signUp } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { openModal } from "../../../reducers/authSlice";
import { validateEmail, validatePassword } from "../../../utils/validators";
import { FormInput } from "../../common/Controls";
import { ErrorMessage } from "../../common/Fonts";

export function SignUp() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
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

    signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          given_name: firstName || "Unknown",
          family_name: lastName || "Unknown",
        },
      },
    })
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

  const openSignInModal = () => {
    dispatch(openModal({ modalType: "signin" }));
  };

  return (
    <>
      <div>Sign up</div>
      <FormInput
        placeholder={t("FirstName")}
        value={firstName}
        onChange={setFirstName}
      />
      <FormInput
        placeholder={t("LastName")}
        value={lastName}
        onChange={setLastName}
      />
      <FormInput
        placeholder={t("Email")}
        value={email}
        errorMessage={t("ErrorMessage.InvalidEmailFormat")}
        onChange={setEmail}
        validate={validateEmail}
        showErrorMessage={showErrorMessage}
        isRequired={true}
      />
      <FormInput
        placeholder={t("Password")}
        value={password}
        errorMessage={t("ErrorMessage.InvalidPasswordFormat")}
        onChange={setPassword}
        validate={validatePassword}
        showErrorMessage={showErrorMessage}
        isPassword={true}
        isRequired={true}
      />
      <div className="single-line">
        <div>Already a member?</div>
        <Link onClick={openSignInModal}>Login in</Link>
      </div>
      <Button type="primary" onClick={signUpButtonOnClick}>
        Sign up
      </Button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </>
  );
}
