import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import TextInput from "../common/TextInput";
import PrimaryButton from "../common/PrimaryButton";
import Checkbox from "../common/Checkbox";
import Banner from "../common/Banner";
import { useLogin } from "../../hooks/useLogin";
import { authErrorPresentation } from "../../constants/errorMessages";
import { isValidEmail } from "../../lib/validation";

export default function LoginForm() {
  const { submit, isSubmitting, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const emailError =
    email.length > 0 && !isValidEmail(email) ? "Please enter a valid email format " : undefined;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValidEmail(email)) return;
    submit({ email, password, rememberMe });
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} >
      <TextInput
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={emailError}
      />
      <TextInput
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <div className="flex flex-row items-center justify-between">
        <Checkbox label="Remember Me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
        <Link to="/forgot-password" className="text-sm font-medium text-brand hover:underline">
          Forget Password ?
        </Link>
      </div>
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

      <PrimaryButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </PrimaryButton>
    </form>
  );
}
