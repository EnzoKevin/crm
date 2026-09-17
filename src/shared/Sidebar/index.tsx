import { LayoutDashboard, Users, Briefcase, UserCheck, Settings, Target, LogOut } from "lucide-react";
import type { View, AuthUser } from "../../../types";
import { initials, roleLabels } from "../../../lib/utils";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "contacts", label: "Contatos", icon: Users },
  { id: "deals", label: "Negócios", icon: Briefcase },
  { id: "users", label: "Usuários", icon: UserCheck },
  { id: "settings", label: "Configurações", icon: Settings },
];

interface SidebarProps {
  view: View;
  setView: (v: View) => void;
  user: AuthUser;
  onLogout: () => void;
}

export default function Sidebar({ view, setView, user, onLogout }: SidebarProps) {
  return (
    <aside className="w-[220px] flex-shrink-0 bg-[#0F1724] flex flex-col h-full">
      <div className="p-5 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0EA47A] flex items-center justify-center flex-shrink-0">
            <Target className="w-4 h-4 text-white" />
          </div>
          <span
            className="text-white font-semibold text-base tracking-tight"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Nexus CRM
          </span>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        <div className="text-[#4A5568] text-[10px] font-semibold uppercase tracking-widest px-3 pt-4 pb-2">
          Principal
        </div>
        {navItems.slice(0, 3).map(item => {
          const Icon = item.icon;
          const active = view === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id as View)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                active
                  ? "bg-[#1A2B44] text-white"
                  : "text-[#6B7A94] hover:text-[#C8D3E8] hover:bg-white/5"
              }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-[#0EA47A]" : ""}`} />
              <span className="font-medium">{item.label}</span>
              {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0EA47A]" />}
            </button>
          );
        })}

        <div className="text-[#4A5568] text-[10px] font-semibold uppercase tracking-widest px-3 pt-5 pb-2">
          Administração
        </div>
        {navItems.slice(3).map(item => {
          const Icon = item.icon;
          const active = view === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id as View)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                active
                  ? "bg-[#1A2B44] text-white"
                  : "text-[#6B7A94] hover:text-[#C8D3E8] hover:bg-white/5"
              }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-[#0EA47A]" : ""}`} />
              <span className="font-medium">{item.label}</span>
              {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0EA47A]" />}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-[#1A3557] flex items-center justify-center flex-shrink-0">
            <span className="text-[#0EA47A] text-xs font-semibold">{initials(user.name)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs font-medium truncate">{user.name}</div>
            <div className="text-[#4A5568] text-[10px] truncate">{roleLabels[user.role]}</div>
          </div>
          <button onClick={onLogout} className="text-[#4A5568] hover:text-red-400 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
