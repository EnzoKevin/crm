import type { AuthUser } from "../../types";
import AuthLeftPanel from "./components/AuthLeftPanel";
import AuthForm from "./components/AuthForm";

interface AuthScreenProps {
  view: "login" | "register";
  setView: (v: "login" | "register") => void;
  onLogin: (user: AuthUser) => void;
}

export default function AuthScreen({ view, setView, onLogin }: AuthScreenProps) {
  return (
    <div className="min-h-screen bg-[#0F1724] flex">
      <AuthLeftPanel />
      <AuthForm view={view} setView={setView} onLogin={onLogin} />
    </div>
  );
}
