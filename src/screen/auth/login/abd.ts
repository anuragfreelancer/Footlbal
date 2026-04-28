// Password validation utility
// Exported function to be used across the auth module
export const validatePassword = (pwd: string): string | null => {
  // Ensure password is provided
  if (!pwd) return 'Password is required';

  // Minimum length check
  if (pwd.length < 6) return 'Password must be at least 6 characters long';

  // Must contain uppercase, numeric, and special character
  const hasUpper = /[A-Z]/.test(pwd);
  const hasNumber = /[0-9]/.test(pwd);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
  if (!hasUpper || !hasNumber || !hasSpecial) {
    return 'Password must include uppercase, number, and special character';
  }

  // All checks passed
  return null;
};
