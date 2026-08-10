import { useNavigate } from "react-router-dom";
import Success from "../../assets/success.svg";
import PrimaryButton from "../common/PrimaryButton";

export default function ResetPasswordSuccess() {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <div className=" flex justify-center mb-4">
      <img src={Success} className="w-15" />
      </div>

      <h1 className="mb-4 text-2xl font-semibold text-ink sm:text-3xl">Password reset successfully</h1>
      <p className="mb-8 text-sm text-ink sm:text-base">
        Your password has been updated, you can login with new password.
      </p>

      <PrimaryButton type="button" onClick={() => navigate("/login")}>
        Back to login
      </PrimaryButton>
    </div>
  );
}
