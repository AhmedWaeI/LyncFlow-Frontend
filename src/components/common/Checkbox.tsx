import type { InputHTMLAttributes } from "react";

type CheckboxProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  "checked" | "defaultChecked" | "onChange" | "name" | "disabled"
> & {
  label?: string;
};

export default function Checkbox({ label, ...rest }: CheckboxProps) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        className="h-5 w-5 appearance-none rounded border-2 border-input-border bg-white bg-no-repeat bg-center checked:border-brand checked:bg-brand"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M2 6L5 9L10 3' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
          backgroundSize: "15px 15px",
        }}
        {...rest}
      />
      {label && <span className="font-medium text-ink">{label}</span>}
    </label>
  );
}
