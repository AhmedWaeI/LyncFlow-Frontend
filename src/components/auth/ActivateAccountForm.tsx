import { type FormEvent, useState } from "react";
import TextInput from "../common/TextInput";
import PrimaryButton from "../common/PrimaryButton";
import Checkbox from "../common/Checkbox";
import Banner from "../common/Banner";
import PasswordChecklist from "../common/PasswordChecklist";
import { authErrorPresentation } from "../../constants/errorMessages";
import { isPasswordValid } from "../../constants/passwordPolicy";
import type { ActivationDetails, ApiError } from "../../types/auth";

interface ActivateAccountFormProps {
  details: ActivationDetails;
  onSubmit: (payload: {
    password: string;
    confirmPassword: string;
    termsAccepted: boolean;
    privacyPolicyAccepted: boolean;
  }) => void;
  isSubmitting: boolean;
  error: ApiError | null;
}

export default function ActivateAccountForm({ details, onSubmit, isSubmitting, error }: ActivateAccountFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);

  const passwordsMatch = confirmPassword.length === 0 || password === confirmPassword;
  const canSubmit =
    isPasswordValid(password) &&
    password === confirmPassword &&
    termsAccepted &&
    privacyPolicyAccepted &&
    !isSubmitting;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (canSubmit) onSubmit({ password, confirmPassword, termsAccepted, privacyPolicyAccepted });
  }

  return (
    <>
      <h1 className="mb-2 text-2xl font-semibold text-ink sm:text-3xl">Activate your account</h1>
      <p className="mb-8 text-sm text-gray-500 sm:text-base">
        Set a password for <span className="font-medium text-ink">{details.account.email}</span> to finish
        setting up your account.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        {error && (
          <Banner
            variant={authErrorPresentation[error.code].variant}
            title={authErrorPresentation[error.code].title}
            message={error.message ?? authErrorPresentation[error.code].message}
            details={error.details}
          />
        )}

        <TextInput
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextInput
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!passwordsMatch ? "Passwords do not match." : undefined}
        />

        <div>
          <p className="mb-2 text-sm text-gray-500">Your password must include:</p>
          <PasswordChecklist password={password} />
        </div>

        <div className="space-y-2">
          <Checkbox
            label={`I agree to the Terms & Conditions (v${details.agreements.termsVersion})`}
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <Checkbox
            label={`I agree to the Privacy Policy (v${details.agreements.privacyPolicyVersion})`}
            checked={privacyPolicyAccepted}
            onChange={(e) => setPrivacyPolicyAccepted(e.target.checked)}
          />
        </div>

        <PrimaryButton type="submit" disabled={!canSubmit}>
          {isSubmitting ? "Activating..." : "Activate Account"}
        </PrimaryButton>
      </form>
    </>
  );
}
