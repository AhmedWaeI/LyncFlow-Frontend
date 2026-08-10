import AuthLayout from "../components/auth/AuthLayout";
import ResetPasswordForm from "../components/auth/ResetPasswordForm";
import ResetPasswordError from "../components/auth/ResetPasswordError";
import ResetPasswordSuccess from "../components/auth/ResetPasswordSuccess";
import { useResetPassword } from "../hooks/useResetPassword";

export default function ResetPasswordPage() {
  const { step, submit, isSubmitting, error } = useResetPassword();

  return (
    <AuthLayout>
      {step === "loading" && <p className="animate-pulse text-sm text-gray-500">Checking your reset link…</p>}

      {step === "tokenError" && error && <ResetPasswordError error={error} />}

      {step === "form" && <ResetPasswordForm onSubmit={submit} isSubmitting={isSubmitting} error={error} />}

      {step === "success" && <ResetPasswordSuccess />}
    </AuthLayout>
  );
}
