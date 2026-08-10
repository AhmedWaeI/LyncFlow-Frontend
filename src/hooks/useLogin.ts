import { useState } from "react";
import * as authApi from "../api/authApi";
import type { ApiError, LoginPayload } from "../types/auth";

export function useLogin() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  async function submit(payload: LoginPayload) {
    setIsSubmitting(true);
    setError(null);
    try {
      await authApi.login(payload);
      // The landing page belongs to the shell, so cross the zone boundary
      // with a full document navigation instead of React Router.
      window.location.assign("/");
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return { submit, isSubmitting, error };
}
