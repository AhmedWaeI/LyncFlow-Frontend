import Success from "../../assets/success.svg";
import PrimaryButton from "../common/PrimaryButton";

interface SignupSuccessProps {
  onContinue: () => void;
}

export default function SignupSuccess({ onContinue }: SignupSuccessProps) {

  return (
    <div className="text-center">
      <div className="mb-4 flex justify-center">
        <img src={Success} alt="Signup successful" className="w-15" />
      </div>

      <h1 className="mb-4 text-2xl font-semibold text-ink sm:text-3xl">Signup successful</h1>
      <p className="mb-8 text-sm text-ink sm:text-base">Your account is ready. Sign in to continue.</p>

      <PrimaryButton type="button" onClick={onContinue}>
        Go to login
      </PrimaryButton>
    </div>
  );
}