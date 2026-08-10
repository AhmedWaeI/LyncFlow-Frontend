import { type FormEvent } from "react";
import TextInput from "../common/TextInput";
import PrimaryButton from "../common/PrimaryButton";
import Banner from "../common/Banner";
import { authErrorPresentation } from "../../constants/errorMessages";
import { isValidEmail } from "../../lib/validation";
import type { SignupRole } from "../../types/auth";
import { useSignup } from "../../hooks/useSignup";
import PasswordChecklist from "../common/PasswordChecklist";

export default function SignupForm() {
    const {
        fullName,
        setFullName,
        email,
        setEmail,
        company,
        setCompany,
        password,
        setPassword,
        role,
        setRole,
        submit,
        isSubmitting,
        error,
    } = useSignup();


    const emailError =
        email.length > 0 && !isValidEmail(email) ? "Please enter a valid email format " : undefined;

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!isValidEmail(email)) return;
        submit({ role, email, password, company, fullName });
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit} >
            <div className="flex flex-col space-y-3">
                <p className="text-[#A3ABB8] font-sans font-normal leading-5">I am</p>
                <label className="flex items-center">
                    <span
                        className={`relative mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-input-border ${role === "REAL_ESTATE_DEVELOPER"
                            ? "bg-brand"
                            : "bg-white"
                            }`}
                    >
                        <input
                            className="absolute inset-0 cursor-pointer opacity-0"
                            type="radio"
                            name="role"
                            value="REAL_ESTATE_DEVELOPER"
                            checked={role === "REAL_ESTATE_DEVELOPER"}
                            onChange={(e) => setRole(e.target.value as SignupRole)}
                        />

                        <span
                            className={`h-2.5 w-2.5 rounded-full ${role === "REAL_ESTATE_DEVELOPER"
                                ? "bg-amber-50"
                                : "bg-transparent"
                                }`}
                        />
                    </span>

                    <p className="font-sans">Real estate Developer</p>
                </label>


                <label className="flex items-center">
                    <span
                        className={`mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-input-border ${role === "BROKERAGE_COMPANY"
                            ? "bg-brand"
                            : "bg-white"
                            }`}
                    >
                        <input
                            className="peer sr-only"
                            type="radio"
                            name="role"
                            value="BROKERAGE_COMPANY"
                            checked={role === "BROKERAGE_COMPANY"}
                            onChange={(e) => setRole(e.target.value as SignupRole)}
                        />

                        <span className="h-2.5 w-2.5 rounded-full bg-transparent peer-checked:bg-amber-50" />
                    </span>

                    <p className="font-sans">Brokerage Company</p>
                </label>

                <label className="flex items-center">
                    <span
                        className={`mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-input-border ${role === "SALES_AGENT"
                            ? "bg-brand"
                            : "bg-white"
                            }`}
                    >
                        <input
                            className="peer sr-only"
                            type="radio"
                            name="role"
                            value="SALES_AGENT"
                            checked={role === "SALES_AGENT"}
                            onChange={(e) => setRole(e.target.value as SignupRole)}
                        />

                        <span className="h-2.5 w-2.5 rounded-full bg-transparent peer-checked:bg-amber-50" />
                    </span>

                    <p className="font-sans">Sales Agent</p>
                </label>
            </div>
            <TextInput
                name="fullName"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
            />
            <TextInput
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                required
            />
            <TextInput
                name="company"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
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


            {error && (
                <Banner
                    variant={authErrorPresentation[error.code].variant}
                    title={authErrorPresentation[error.code].title}
                    message={error.message ?? authErrorPresentation[error.code].message}
                />
            )}
            <div>
                <p className="mb-2 text-sm text-gray-500">Your new password must include:</p>
                <PasswordChecklist password={password} />
            </div>
            <PrimaryButton className="mt-3" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Signing up...." : "Create Account"}
            </PrimaryButton>
        </form>
    );
}
