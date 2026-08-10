import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authApi from "../api/authApi";
import type { ApiError, LoginPayload } from "../types/auth";

export function useLogin() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  async function submit(payload: LoginPayload) {
    setIsSubmitting(true);
    setError(null);
    try {
      await authApi.login(payload);
      navigate("/"); 
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return { submit, isSubmitting, error };
}
