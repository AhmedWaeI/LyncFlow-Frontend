import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as authApi from "../api/authApi";
import type { ActivationDetails, ApiError } from "../types/auth";

type Step = "loading" | "form" | "success" | "tokenError";

export function useActivateAccount() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [step, setStep] = useState<Step>("loading");
  const [details, setDetails] = useState<ActivationDetails | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    authApi
      .validateActivation(token)
      .then((data) => {
        setDetails(data);
        setStep("form");
      })
      .catch((err: ApiError) => {
        setError(err);
        setStep("tokenError");
      });
  }, [token]);

  async function submit(payload: {
    password: string;
    confirmPassword: string;
    termsAccepted: boolean;
    privacyPolicyAccepted: boolean;
  }) {
    setIsSubmitting(true);
    setError(null);
    try {
      await authApi.completeActivation({ token, ...payload });
      setStep("success");
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return { step, details, submit, isSubmitting, error };
}
