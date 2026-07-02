import { Lock, ChevronRight } from "lucide-react";
import Shield from "@/pages/shared/Shield";

export default function SecurityCard() {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="font-semibold text-foreground text-sm">Segurança</h3>
      </div>
      <div className="p-4 space-y-1">
        <button className="w-full flex items-center justify-between px-2 py-3 rounded-lg text-foreground hover:bg-muted transition-colors text-sm">
          <div className="flex items-center gap-3">
            <Lock className="w-4 h-4 text-muted-foreground" />
            <span>Alterar senha</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
        <button className="w-full flex items-center justify-between px-2 py-3 rounded-lg text-foreground hover:bg-muted transition-colors text-sm">
          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-muted-foreground" />
            <span>Autenticação 2FA</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
