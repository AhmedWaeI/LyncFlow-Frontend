import AuthLayout from "../components/auth/AuthLayout";
import ActivateAccountForm from "../components/auth/ActivateAccountForm";
import ActivationTokenError from "../components/auth/ActivationTokenError";
import ActivationSuccess from "../components/auth/ActivationSuccess";
import { useActivateAccount } from "../hooks/useActivateAccount";

export default function ActivateAccountPage() {
  const { step, details, submit, isSubmitting, error } = useActivateAccount();

  return (
    <AuthLayout>
      {step === "loading" && <p className="animate-pulse text-sm text-gray-500">Checking your activation link…</p>}

      {step === "tokenError" && error && <ActivationTokenError error={error} />}

      {step === "form" && details && (
        <ActivateAccountForm details={details} onSubmit={submit} isSubmitting={isSubmitting} error={error} />
      )}

      {step === "success" && <ActivationSuccess />}
    </AuthLayout>
  );
}
