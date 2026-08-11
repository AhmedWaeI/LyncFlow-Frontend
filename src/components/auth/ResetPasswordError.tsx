import { Link, useNavigate } from "react-router-dom";
import Banner from "../common/Banner";
import PrimaryButton from "../common/PrimaryButton";
import { authErrorPresentation } from "../../constants/errorMessages";
import type { ApiError } from "../../types/auth";

interface ResetPasswordErrorProps {
  error: ApiError;
}

export default function ResetPasswordError({ error }: ResetPasswordErrorProps) {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold text-ink sm:text-3xl">Reset password</h1>

      <div className="space-y-4">
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
        <PrimaryButton type="button" onClick={() => navigate("/forgot-password")}>
          Request a new Link
        </PrimaryButton>
      </div>

      <Link to="/login" className="mt-6 flex items-center justify-center gap-1.5 text-sm text-gray-500 hover:underline">
        ← Back to Login
      </Link>
    </>
  );
}
