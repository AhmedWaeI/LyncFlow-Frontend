import type {
  ApiError,
  AuthErrorCode,
  ForgotPasswordPayload,
  LoginPayload,
  SignupPayload,
  ResetPasswordPayload,
} from "../types/auth";
import { isPasswordValid } from "../constants/passwordPolicy";

/**
 * ---------------------------------------------------------------------
 * MOCK API LAYER — delete the "MOCK ONLY" block in each function once
 * the real backend is live, and fill in the fetch call below it.
 * Nothing in hooks/, components/, or pages/ needs to change when you do —
 * they only depend on these function signatures and the ApiError shape.
 * ---------------------------------------------------------------------
 */

const MOCK_DELAY_MS = 700;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function apiError(code: AuthErrorCode, message?: string): never {
  const error: ApiError = { code, message };
  throw error;
}

export async function login(payload: LoginPayload): Promise<{ token: string }> {
  await wait(MOCK_DELAY_MS);

  // --- MOCK ONLY: try locked@test.com / suspended@test.com, or any other
  // email with a password that isn't "Abc12345" ---
  if (payload.email === "locked@test.com") apiError("ACCOUNT_LOCKED");
  if (payload.email === "suspended@test.com") apiError("ACCOUNT_SUSPENDED");
  if (payload.password !== "Abc12345") apiError("INVALID_CREDENTIALS");
  // -----------------------------------------------------------------

  // TODO(api):
  // const res = await fetch("/api/auth/login", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),
  // });
  // if (!res.ok) apiError((await res.json()).code);
  // return res.json();

  return { token: "mock-token" };
}

export async function signup(payload: SignupPayload): Promise<void> {
  await wait(MOCK_DELAY_MS);

  if (payload.email === "taken@test.com") apiError("EMAIL_ALREADY_IN_USE");
  if (!isPasswordValid(payload.password)) apiError("PASSWORD_POLICY_VIOLATION");


  // TODO(api): POST /api/auth/signup
}

export async function forgotPassword(payload: ForgotPasswordPayload): Promise<void> {
  await wait(MOCK_DELAY_MS);
  void payload;

  // TODO(api): POST /api/auth/forgot-password
  // Convention: the backend should respond success even for an email that
  // doesn't exist, so we don't leak which addresses are registered — the
  // UI always shows "check your email" either way.
}

export async function validateResetToken(token: string): Promise<void> {
  await wait(MOCK_DELAY_MS);

  // --- MOCK ONLY: visit /reset-password?token=expired (or invalid /
  // multiple) to see each error state without a backend ---
  if (token === "expired") apiError("RESET_LINK_EXPIRED");
  if (token === "invalid") apiError("RESET_LINK_INVALID");
  if (token === "multiple") apiError("MULTIPLE_RESET_REQUESTS");
  // -----------------------------------------------------------------

  // TODO(api): GET /api/auth/reset-password/validate?token=...
}

export async function resetPassword(payload: ResetPasswordPayload): Promise<void> {
  await wait(MOCK_DELAY_MS);

  // --- MOCK ONLY: submitting "Abc123" simulates reusing the current password ---
  if (payload.password === "Abc123") apiError("PASSWORD_SAME_AS_CURRENT");
  // -----------------------------------------------------------------

  // TODO(api): POST /api/auth/reset-password
}
