import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import TextInput from "../common/TextInput";
import PrimaryButton from "../common/PrimaryButton";
import Banner from "../common/Banner";
import { authErrorPresentation } from "../../constants/errorMessages";
import type { ApiError } from "../../types/auth";
import { isValidEmail } from "../../lib/validation";

interface ForgotPasswordFormProps {
  email: string;
  setEmail: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  error: ApiError | null;
}

export default function ForgotPasswordForm({ email, setEmail, onSubmit, isSubmitting, error }: ForgotPasswordFormProps) {
  const emailError =
    email.length > 0 && !isValidEmail(email) ? "Please enter a valid email address." : undefined;

  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold text-ink sm:text-3xl">Forgot your password?</h1>
      <p className="mb-8 text-sm text-ink sm:text-base">
        Enter your email and we'll send you a verification link to reset your password.
      </p>

      <form className="space-y-8" onSubmit={onSubmit}>
        <TextInput
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          required
        />

        <PrimaryButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send verification Link"}
        </PrimaryButton>

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
      </form>

      <Link to="/login" className="mt-6 flex items-center justify-center gap-1.5 text-sm text-gray-500 hover:underline">
        <ArrowLeft size={14} /> Back to Login
      </Link>
    </>
  );
}
