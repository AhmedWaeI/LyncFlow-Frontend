import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <AuthLayout>
      <h1 className="mb-2 text-2xl font-semibold text-ink sm:text-3xl">Welcome Back</h1>
      <p className="mb-8 text-sm text-gray-500 sm:text-base">Sign in to your LynkFlow account to continue.</p>

      <LoginForm />

      <p className="mt-6 text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link to="/signup" className="font-medium text-brand hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
