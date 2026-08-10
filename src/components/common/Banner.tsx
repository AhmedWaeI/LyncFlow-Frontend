import { AlertCircle, AlertTriangle, CheckCircleIcon, LockKeyhole, PauseCircleIcon } from "lucide-react";
import type { BannerVariant } from "../../constants/errorMessages";

interface BannerProps {
  variant: BannerVariant;
  title: string;
  message?: string;
}

const variantStyles: Record<BannerVariant, { container: string; icon: string; Icon: typeof AlertCircle, sidebar:string }> = {
  error: {
    container: "border-0 bg-[#FEE4E2] text-[#B42318]",
    icon: "text-[#B42318]",
    Icon: AlertCircle,
    sidebar:"bg-[#B42318]",
  },

  warning: {
    container: "border-amber-200 bg-amber-50 text-amber-800",
    icon: "text-amber-500",
    Icon: AlertTriangle,
    sidebar:"bg-[#B7791F]",

  },
  success: {
    container: "border-green-200 bg-green-50 text-green-700",
    icon: "text-green-600",
    Icon: CheckCircleIcon,
    sidebar:"bg-[#0E7549]",

  },
};

export default function Banner({ variant, title, message }: BannerProps) {
  const { container, icon, sidebar } = variantStyles[variant];

  const Icon : typeof AlertCircle = title === "Account Locked" ? LockKeyhole : title ==="Invalid email address or password."?
   variantStyles[variant].Icon: PauseCircleIcon;

  return (
    <div className={`flex flex-row  rounded-lg border overflow-hidden mt-8   ${container}`}>
      <div className={`min-w-1 max-w-1.5  ${sidebar}`}>
      </div>
      <div className="flex flex-row  ml-3 mr-8 my-4">
          <Icon size={24} className={`shrink-0 mr-2 ${icon}`} />
        <div className="flex flex-col gap-0.5 align-items-center content-center justify-center">
          <p className="font-semibold  font-['Inter',sans-serif]">{title}</p>

          {message && <p className="mt-0.5 text-[#5D6674] text-[13px] opacity-90">{message}</p>}

        </div>
      </div>
    </div>
  );
}
