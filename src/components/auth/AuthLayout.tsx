import type { ReactNode } from "react";
import Logo from "../common/Logo";
import logoDark from "../../assets/logo-dark.svg";
import Container from "../../assets/Container.png";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white md:flex-row">
      <div
      className="relative hidden md:flex md:w-1/3 flex-col justify-between overflow-hidden p-10 lg:p-14"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(6,46,30,0.1), rgba(6,46,30,0.5)), url(${Container})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
    >
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-10 md:px-12 lg:px-16">
        <div className="w-full max-w-112.25">
          <div className="mb-8 flex items-center gap-2 md:hidden">
            <Logo src={logoDark} />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
