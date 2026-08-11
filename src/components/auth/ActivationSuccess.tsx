import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import PrimaryButton from "../common/PrimaryButton";

export default function ActivationSuccess() {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand/10">
        <CheckCircle2 size={20} className="text-brand" />
      </div>

      <h1 className="mb-2 text-2xl font-semibold text-ink sm:text-3xl">Account activated</h1>
      <p className="mb-8 text-sm text-gray-500 sm:text-base">Your account is ready. You can now sign in to LynkFlow.</p>

      <PrimaryButton type="button" onClick={() => navigate("/login")}>
        Sign in
      </PrimaryButton>
    </div>
  );
}
