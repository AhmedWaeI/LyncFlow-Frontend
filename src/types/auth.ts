// Every error state the Figma frames show. Keeping this as a union (rather
// than a raw string) means TypeScript will error if you reference a code
// that doesn't exist, and errorMessages.ts below is forced to handle all of them.
export type AuthErrorCode =
  | "INVALID_CREDENTIALS"
  | "EMAIL_ALREADY_IN_USE"
  | "ACCOUNT_LOCKED"
  | "ACCOUNT_SUSPENDED"
  | "SESSION_EXPIRED"
  | "RESET_LINK_EXPIRED"
  | "RESET_LINK_INVALID"
  | "MULTIPLE_RESET_REQUESTS"
  | "PASSWORD_POLICY_VIOLATION"
  | "PASSWORD_SAME_AS_CURRENT"
  | "RESET_SESSION_EXPIRED";

// The shape every api/authApi.ts function throws on failure. `message` is
// optional — the backend can override the default copy from
// errorMessages.ts with something more specific, but doesn't have to.
export interface ApiError {
  code: AuthErrorCode;
  message?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignupPayload {
  fullName: string;
  email: string;
  company: string;
  password: string;
  role: SignupRole;
}

export type SignupRole = "REAL_ESTATE_DEVELOPER" | "BROKERAGE_COMPANY" | "SALES_AGENT";

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}
