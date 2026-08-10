import type { ButtonHTMLAttributes, ReactNode } from "react";

type PrimaryButtonProps = Pick<ButtonHTMLAttributes<HTMLButtonElement>, "className" |"type" | "onClick" | "disabled"> & {
  children: ReactNode;
};

export default function PrimaryButton({ children, type = "button", className, ...rest }: PrimaryButtonProps) {
  return (
    <button
      type={type}
      className={`${className} h-13 w-full rounded-lg bg-brand px-6 py-3 font-medium text-white transition-colors hover:bg-brand-dark active:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60`}
      {...rest}
    >
      {children}
    </button>
  );
}
