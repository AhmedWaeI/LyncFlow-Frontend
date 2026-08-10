import mailIcon from "../../assets/send.svg";
import { Link } from "react-router-dom";

interface CheckEmailNoticeProps {
  onResend: () => void;
  isSubmitting: boolean;
}

export default function CheckEmailNotice({ onResend, isSubmitting }: CheckEmailNoticeProps) {
  return (
    <>
      <div className="flex flex-row items-center mb-4 gap-4">
        <img src={mailIcon} alt="Mail Icon" className=" w-16" />
              <h1 className="mb-2 text-2xl font-semibold text-ink sm:text-3xl">Check your email</h1>

      </div>

      <p className="mb-8 text-sm text-gray-500 sm:text-base">
        If the email address exists in our system, a password reset link has been sent.
      </p>

      <p className="text-center text-sm text-gray-500">
        Didn't receive the email?{" "}
        <button
          type="button"
          onClick={onResend}
          disabled={isSubmitting}
          className="font-medium text-brand hover:underline disabled:opacity-50"
        >
          Resend Link
        </button>
      </p>

      <Link to="/login" className="mt-8 flex items-center justify-center gap-1.5 text-sm text-gray-500 hover:underline">
        ← Back to Login
      </Link>
    </>
  );
}
