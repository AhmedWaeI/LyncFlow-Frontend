import AuthLayout from "../components/auth/AuthLayout";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";
import CheckEmailNotice from "../components/auth/CheckEmailNotice";
import { useForgotPassword } from "../hooks/useForgotPassword";

export default function ForgotPasswordPage() {
  const { email, setEmail, step, submit, isSubmitting, error } = useForgotPassword();

  return (
    <AuthLayout>
      {step === "form" ? (
        <ForgotPasswordForm email={email} setEmail={setEmail} onSubmit={submit} isSubmitting={isSubmitting} error={error} />
      ) : (
        <CheckEmailNotice onResend={() => submit()} isSubmitting={isSubmitting} />
      )}
    </AuthLayout>
  );
}
