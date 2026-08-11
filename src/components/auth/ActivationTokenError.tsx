import { Link } from "react-router-dom";
import Banner from "../common/Banner";
import { authErrorPresentation } from "../../constants/errorMessages";
import type { ApiError } from "../../types/auth";

interface ActivationTokenErrorProps {
  error: ApiError;
}

// Unlike a reset-password link, there's no self-serve "send me a new one"
// here - only an admin can issue a new activation token - so this just
// explains the problem and points back to Login rather than offering a retry.
export default function ActivationTokenError({ error }: ActivationTokenErrorProps) {
  const presentation = authErrorPresentation[error.code];

  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold text-ink sm:text-3xl">Activate your account</h1>

      <Banner
        variant={presentation.variant}
        title={presentation.title}
        message={error.message ?? presentation.message}
        details={error.details}
      />

      <Link to="/login" className="mt-6 flex items-center justify-center gap-1.5 text-sm text-gray-500 hover:underline">
        ← Back to Login
      </Link>
    </>
  );
}
