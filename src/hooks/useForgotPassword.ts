import { type FormEvent, useState } from "react";
import * as authApi from "../api/authApi";
import type { ApiError } from "../types/auth";

type Step = "form" | "sent";

export function useForgotPassword() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<Step>("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);


  async function submit(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await authApi.forgotPassword({ email });
      setStep("sent");
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return { email, setEmail, step, submit, isSubmitting, error };
}
