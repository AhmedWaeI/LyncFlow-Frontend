import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as authApi from "../api/authApi";
import type { ApiError } from "../types/auth";

type Step = "loading" | "success" | "tokenError";

export function useActivateAccount() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [step, setStep] = useState<Step>("loading");
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function activate() {
      try {
        await authApi.completeActivation({ token, termsAccepted: true, privacyPolicyAccepted: true });
        if (!cancelled) setStep("success");
      } catch (err) {
        if (!cancelled) {
          setError(err as ApiError);
          setStep("tokenError");
        }
      }
    }

    activate();
    return () => {
      cancelled = true;
    };
  }, [token]);

  return { step, error };
}