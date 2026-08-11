import type {
  ActivationDetails,
  ApiError,
  AuthErrorCode,
  CompleteActivationPayload,
  ForgotPasswordPayload,
  LoginPayload,
  LoginResult,
  ResetPasswordPayload,
  SignupRole,
} from "../types/auth";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

interface ApiEnvelope<T> {
  success: boolean;
  message?: string;
  data?: T;
}

async function throwApiError(res: Response): Promise<never> {
  const body = await res.json().catch(() => ({}));


  const errorBody = body.error ?? {};

  const code = (errorBody.code ?? "NETWORK_ERROR") as AuthErrorCode;

  const details = Array.isArray(errorBody.data)
    ? (errorBody.data as string[])
    : undefined;

  const error: ApiError = {
    code,
    message: errorBody.message,
    details,
  };

  throw error;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {

    res = await fetch(`${API_BASE_URL}${path}`, {
      credentials: "include",
      headers: { "Content-Type": "application/json", ...init?.headers },
      ...init,
    });
  } catch {
    
    const error: ApiError = {
      code: "NETWORK_ERROR",
      message: "Couldn't reach the server. Please check your connection and try again.",
    };
    throw error;
  }

  if (!res.ok) await throwApiError(res);

  const body = (await res.json()) as ApiEnvelope<T>;
  return body.data as T;
}

export async function login(payload: LoginPayload): Promise<LoginResult> {
  return request<LoginResult>("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function forgotPassword(payload: ForgotPasswordPayload): Promise<void> {
  await request<void>("/api/v1/auth/password/forgot", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function validateResetToken(token: string): Promise<void> {
  await request<void>("/api/v1/auth/password/reset/validate", {
    method: "POST",
    body: JSON.stringify({ token }),
  });
}

export async function resetPassword(payload: ResetPasswordPayload): Promise<void> {
  await request<void>("/api/v1/auth/password/reset", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function signup(payload: { email: string; password: string, fullName: string, accountType: SignupRole, company: string }): Promise<void> {
  await request<void>("/api/v1/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function validateActivation(token: string): Promise<ActivationDetails> {
  return request<ActivationDetails>("/api/v1/auth/activation/validate", {
    method: "POST",
    body: JSON.stringify({ token }),
  });
}

export async function completeActivation(payload: CompleteActivationPayload): Promise<void> {
  await request<{ loginPath: string }>("/api/v1/auth/activation/complete", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}


/**
 * ---------------------------------------------------------------------
 * STILL MOCKED - no backend endpoint for self-serve signup exists (your
 * backend uses an invite + activation flow instead, see the chat note).
 * Kept exactly as you had it so nothing currently depending on it breaks.
 * ---------------------------------------------------------------------
 */
// const MOCK_DELAY_MS = 700;

// function wait(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// function mockApiError(code: AuthErrorCode, message?: string): never {
//   const error: ApiError = { code, message };
//   throw error;
// }

