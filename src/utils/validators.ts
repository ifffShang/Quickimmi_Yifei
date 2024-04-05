export function validatePassword(password: string): string {
  if (!password) return "ErrorMessage.PasswordRequired";
  const hasNumber = /[0-9]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  if (password.length >= 8 && hasNumber && hasUpperCase && hasLowerCase) {
    return "";
  }
  return "ErrorMessage.InvalidPasswordFormat";
}

/**
 * Return an error message if the email is invalid.
 * @param email
 * @returns
 */
export function validateEmail(email: string): string {
  if (!email) return "ErrorMessage.EmailRequired";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) {
    return "ErrorMessage.InvalidEmailFormat";
  }
  return "";
}

export function validatePasswordConfirmation(
  password: string,
  confirmPassword: string,
): string {
  if (!confirmPassword) return "ErrorMessage.ConfirmPasswordRequired";
  if (password !== confirmPassword) return "ErrorMessage.PasswordsDoNotMatch";
  return "";
}

export function validateCode(code: string): string {
  if (!code) return "ErrorMessage.CodeRequired";
  if (code.length !== 6) return "ErrorMessage.InvalidCodeFormat";
  return "";
}
