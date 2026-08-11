import { useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

type TextInputProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | "type"
  | "name"
  | "placeholder"
  | "autoComplete"
  | "value"
  | "onChange"
  | "onBlur"
  | "required"
> & {
  error?: string;
};

export default function TextInput({
  type = "text",
  error,
  placeholder,
  value,
  onChange,
  ...rest
}: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const hasValue = Boolean(value);

  // Browser autofill writes into the DOM directly, without firing onChange,
  // so React state (and hasValue) doesn't know the field was filled.
  // This animation-based trick catches that moment and syncs state manually.
  const handleAutofill = (e: React.AnimationEvent<HTMLInputElement>) => {
    if (e.animationName === "autofill" && onChange) {
      onChange({
        ...e,
        target: e.target,
        currentTarget: e.target,
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div>
      <div className="relative">
        <input
          type={isPassword && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          onAnimationStart={handleAutofill}
          placeholder=" "
          className={`peer h-13 w-full rounded-lg border bg-white px-3 pt-4 pb-1 font-sans text-sm font-normal leading-5 text-ink outline-none transition-colors autofill:[animation-name:autofill] autofill:bg-white autofill:text-ink ${
            isPassword ? "pr-11" : ""
          } ${
            error
              ? "border-red-400 focus:border-red-500"
              : "border-input-border focus:border-brand-focus"
          }`}
          {...rest}
        />

        <label
          className={`pointer-events-none absolute left-3 px-1 font-sans font-normal text-[#A3ABB8] transition-all ${
            hasValue
              ? "top-1 text-xs"
              : "top-1/2 -translate-y-1/2 text-sm peer-focus:top-1 peer-focus:translate-y-0 peer-focus:text-xs peer-autofill:top-1 peer-autofill:translate-y-0 peer-autofill:text-xs"
          }`}
        >
          {placeholder}
        </label>

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}