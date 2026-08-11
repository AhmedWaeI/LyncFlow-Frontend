import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import TextInput from "../common/TextInput";
import PrimaryButton from "../common/PrimaryButton";
import Banner from "../common/Banner";
import PasswordChecklist from "../common/PasswordChecklist";
import { authErrorPresentation } from "../../constants/errorMessages";
import { isPasswordValid } from "../../constants/passwordPolicy";
import type { ApiError } from "../../types/auth";


interface ResetPasswordFormProps {
  onSubmit: (payload: { newPassword: string; confirmPassword: string }) => void;
  isSubmitting: boolean;
  error: ApiError | null;
}

export default function ResetPasswordForm({ onSubmit, isSubmitting, error }: ResetPasswordFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordsMatch = confirmPassword.length === 0 || password === confirmPassword;
  const canSubmit = isPasswordValid(password) && password === confirmPassword && !isSubmitting;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (canSubmit) onSubmit({ newPassword: password, confirmPassword });
  }

  return (
    <>
      <h1 className="mb-2 text-2xl font-semibold text-ink sm:text-3xl">Set a new password</h1>
      <p className="mb-8 text-sm text-gray-500 sm:text-base">Choose a strong password for best security.</p>

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>


        <TextInput
          type="password"
          name="password"
          placeholder="New Password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextInput
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!passwordsMatch ? "Passwords do not match." : undefined}
        />
        {error && (
          <Banner
            variant={authErrorPresentation[error.code]?.variant ?? "error"}
            title={authErrorPresentation[error.code]?.title ?? "Something went wrong"}
            message={
              error.message ??
              authErrorPresentation[error.code]?.message ??
              "Please try again."
            }
          />
        )}
        <div>
          <p className="mb-2 text-sm text-gray-500">Your new password must include:</p>
          <PasswordChecklist password={password} />
        </div>

        <PrimaryButton type="submit" disabled={!canSubmit}>
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </PrimaryButton>
      </form>

      <Link to="/login" className="mt-6 flex items-center justify-center gap-1.5 text-sm text-gray-500 hover:underline">
        <ArrowLeft size={14} /> Back to Login
      </Link>
    </>
  );
}
