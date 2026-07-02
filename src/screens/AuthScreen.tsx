import type { AuthUser } from "../types";
import AuthLeftPanel from "../pages/auth/components/AuthLeftPanel";
import AuthForm from "../pages/auth/components/AuthForm";

interface AuthScreenProps {
  onLogin: (user: AuthUser) => void;
  view: "login" | "register";
  setView: (v: "login" | "register") => void;
}

export default function AuthScreen({
  onLogin,
  view,
  setView,
}: AuthScreenProps) {
  return (
    <div className="min-h-screen bg-[#0F1724] flex">
      <AuthLeftPanel />
      <AuthForm onLogin={onLogin} view={view} setView={setView} />
    </div>
  );
}
