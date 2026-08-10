import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authApi from "../api/authApi";
import type { ApiError, SignupPayload, SignupRole } from "../types/auth";

type Step = "form" | "success";

export function useSignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("form");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<SignupRole>("REAL_ESTATE_DEVELOPER");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  async function submit(payload: SignupPayload) {
    setIsSubmitting(true);
    setError(null);
    try {
      await authApi.signup(payload);
      setStep("success");
      goToLogin();
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setIsSubmitting(false);
    }
  }

  function goToLogin() {
    navigate("/login");
  }

  return {
    step,
    fullName,
    setFullName,
    email,
    setEmail,
    company,
    setCompany,
    password,
    setPassword,
    role,
    setRole,
    submit,
    isSubmitting,
    error,
  };
}