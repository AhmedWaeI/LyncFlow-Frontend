import { useNavigate } from "react-router-dom";
import Success from "../../assets/success.svg";
import PrimaryButton from "../common/PrimaryButton";

export default function ActivationSuccess() {
  const navigate = useNavigate();

  return (
    <div className="text-center">
        <div className=" flex justify-center mb-4">
          <img src={Success} className="w-15" />
      </div>
      <h1 className="mb-2 text-2xl font-semibold text-ink sm:text-3xl">Account activated</h1>
      <p className="mb-8 text-sm text-gray-500 sm:text-base">Your account is ready. You can now sign in to LynkFlow.</p>

      <PrimaryButton type="button" onClick={() => navigate("/login")}>
        Sign in
      </PrimaryButton>
    </div>
  );
}
