import AuthLayout from "../components/auth/AuthLayout";
import ActivationTokenError from "../components/auth/ActivationTokenError";
import ActivationSuccess from "../components/auth/ActivationSuccess";
import { useActivateAccount } from "../hooks/useActivateAccount";

export default function ActivateAccountPage() {
  const { step, error } = useActivateAccount();

  return (
    <AuthLayout>
      {step === "loading" && <p className="animate-pulse text-sm text-gray-500">Activating your account…</p>}

      {step === "tokenError" && error && <ActivationTokenError error={error} />}

      {step === "success" && <ActivationSuccess />}
    </AuthLayout>
  );
}