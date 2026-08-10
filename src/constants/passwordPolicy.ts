export interface PasswordRule {
  id: string;
  label: string;
  test: (password: string) => boolean;
}

export const passwordRules: PasswordRule[] = [
  { id: "uppercase", label: "At least 1 uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
  { id: "numbers", label: "At least 2 numbers", test: (pw) => (pw.match(/\d/g)?.length ?? 0) >= 2 },
  { id: "length", label: "At least 8 characters", test: (pw) => pw.length >= 8 },
];

export function isPasswordValid(password: string): boolean {
  return passwordRules.every((rule) => rule.test(password));
}
