import { Check } from "lucide-react";
import { passwordRules } from "../../constants/passwordPolicy";

interface PasswordChecklistProps {
  password: string;
}

export default function PasswordChecklist({ password }: PasswordChecklistProps) {
  return (
    <ul className="space-y-1.5">
      {passwordRules.map((rule) => {
        const passed = rule.test(password);
        return (
          <li key={rule.id} className="flex items-center gap-2 text-sm">
            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                passed ? "border-brand bg-brand" : "border-gray-300 bg-white"
              }`}
            >
              {passed && <Check size={10} className="text-white" strokeWidth={3} />}
            </span>
            <span className={passed ? "text-gray-700" : "text-gray-400"}>{rule.label}</span>
          </li>
        );
      })}
    </ul>
  );
}
