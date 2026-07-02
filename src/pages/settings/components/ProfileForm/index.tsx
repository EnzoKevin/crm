import { Check } from "lucide-react";
import type { AuthUser } from "@/types";
import { initials, roleLabels } from "@/lib/utils";

interface ProfileFormProps {
  user: AuthUser;
  profileName: string;
  setProfileName: (v: string) => void;
  profileEmail: string;
  setProfileEmail: (v: string) => void;
  saved: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ProfileForm({
  user,
  profileName,
  setProfileName,
  profileEmail,
  setProfileEmail,
  saved,
  onSubmit,
}: ProfileFormProps) {
  return (
    <div className="lg:col-span-2 bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="font-semibold text-foreground text-sm">
          Perfil do usuário
        </h3>
      </div>
      <form onSubmit={onSubmit} className="p-6 space-y-5">
        <div className="flex items-center gap-5 pb-2">
          <div className="w-16 h-16 rounded-full bg-[#1A3557] flex items-center justify-center shrink-0">
            <span className="text-[#0EA47A] text-2xl font-semibold">
              {initials(profileName)}
            </span>
          </div>
          <div>
            <div className="text-foreground font-medium text-sm">
              {profileName}
            </div>
            <div className="text-muted-foreground text-xs mb-2">
              {roleLabels[user.role]}
            </div>
            <button
              type="button"
              className="text-xs text-[#0EA47A] font-medium hover:underline"
            >
              Alterar foto · JPG, PNG até 2MB
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
              Nome
            </label>
            <input
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-[#0EA47A] transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
              E-mail
            </label>
            <input
              value={profileEmail}
              onChange={(e) => setProfileEmail(e.target.value)}
              className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-[#0EA47A] transition-colors"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
              Cargo
            </label>
            <input
              value={roleLabels[user.role]}
              readOnly
              className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-muted-foreground cursor-not-allowed"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
              Idioma
            </label>
            <select className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-[#0EA47A] transition-colors">
              <option>Português (Brasil)</option>
              <option>English</option>
              <option>Español</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between pt-1">
          {saved && (
            <div className="flex items-center gap-2 text-emerald-600 text-sm">
              <Check className="w-4 h-4" /> Alterações salvas.
            </div>
          )}
          <button
            type="submit"
            className="ml-auto bg-[#0EA47A] hover:bg-[#0d9470] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            Salvar alterações
          </button>
        </div>
      </form>
    </div>
  );
}
