import type { AuthErrorCode } from "../types/auth";

export type BannerVariant = "error" | "warning" | "success";

interface ErrorPresentation {
  variant: BannerVariant;
  title: string;
  message?: string;
}


export const authErrorPresentation: Record<AuthErrorCode, ErrorPresentation> = {
  INVALID_CREDENTIALS: {
    variant: "error",
    title: "Invalid email address or password.",
  },
  EMAIL_ALREADY_IN_USE: {
    variant: "error",
    title: "Email already in use",
    message: "An account already exists for this email address. Try signing in instead.",
  },
  ACCOUNT_LOCKED: {
    variant: "error",
    title: "Account Locked",
    message:
      "Your account has been locked due to multiple unsuccessful login attempts. Please try again later or reset your password.",
  },
  ACCOUNT_SUSPENDED: {
    variant: "error",
    title: "Account Suspended",
    message: "This account has been suspended. Please contact your administrator.",
  },
  SESSION_EXPIRED: {
    variant: "warning",
    title: "Your session has expired",
    message: "Please login again to continue.",
  },
  RESET_LINK_EXPIRED: {
    variant: "error",
    title: "Reset link expired",
    message:
      "This password reset link has expired. Reset links are only valid for 30 minutes. Please request a new one.",
  },
  RESET_LINK_INVALID: {
    variant: "error",
    title: "Password reset link is no longer valid",
    message: "This password reset link can no longer be used. Please request a new password reset link.",
  },
  MULTIPLE_RESET_REQUESTS: {
    variant: "warning",
    title: "Multiple requests detected",
    message: "We noticed multiple password reset requests for this account. Please use the latest email.",
  },
  PASSWORD_POLICY_VIOLATION: {
    variant: "error",
    title: "Password does not comply with the password policy",
    message: "Please enter a different password.",
  },
  PASSWORD_SAME_AS_CURRENT: {
    variant: "error",
    title: "Password cannot be reused",
    message: "Your new password can't be the same as your current password.",
  },
  RESET_SESSION_EXPIRED: {
    variant: "warning",
    title: "Password reset session expired",
    message: "Your password reset session has expired. Please request a new password reset link.",
  },
};
