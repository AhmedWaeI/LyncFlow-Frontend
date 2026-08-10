import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as authApi from "../api/authApi";
import type { ApiError } from "../types/auth";

type Step = "loading" | "form" | "success" | "tokenError";

export function useResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [step, setStep] = useState<Step>("loading");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    authApi
      .validateResetToken(token)
      .then(() => setStep("form"))
      .catch((err: ApiError) => {
        setError(err);
        setStep("tokenError");
      });
  }, [token]);

  async function submit(password: string) {
    setIsSubmitting(true);
    setError(null);
    try {
      await authApi.resetPassword({ token, password });
      setStep("success");
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return { step, submit, isSubmitting, error };
}
