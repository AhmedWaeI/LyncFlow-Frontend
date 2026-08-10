import AuthLayout from "../components/auth/AuthLayout";
import { Link } from "react-router-dom";
import SignupForm from "../components/auth/SignupForm";

export default function LoginPage() {
  return (
    <AuthLayout>
      <h1 className="mb-4 text-2xl font-semibold text-ink sm:text-3xl">Create your account</h1>
      <p className="mb-8 text-sm text-ink sm:text-base">Start your journey with LynkFlow today.</p>

      <SignupForm />

      <p className="mt-4 text-center text-sm text-gray-500">
        Already have account?{" "}
        <Link to="/login" className="font-medium text-brand hover:underline">
          Sign in?
        </Link>
      </p>
    </AuthLayout>
  );
}
