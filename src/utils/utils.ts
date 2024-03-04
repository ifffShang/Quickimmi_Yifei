export function validatePassword(password: string): boolean {
  const hasNumber = /[0-9]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);

  return password.length >= 8 && hasNumber && hasUpperCase && hasLowerCase;
}