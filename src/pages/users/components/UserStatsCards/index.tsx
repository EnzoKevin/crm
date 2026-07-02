import { Users, CheckCircle2, XCircle, Clock } from "lucide-react";
import type { UserRecord } from "../../../../types";

interface UserStatsCardsProps {
  users: UserRecord[];
}

export default function UserStatsCards({ users }: UserStatsCardsProps) {
  const stats = [
    { label: "Total", value: users.length, icon: Users, color: "bg-blue-50 text-blue-600" },
    { label: "Ativos", value: users.filter(u => u.status === "active").length, icon: CheckCircle2, color: "bg-emerald-50 text-emerald-600" },
    { label: "Inativos", value: users.filter(u => u.status === "inactive").length, icon: XCircle, color: "bg-red-50 text-red-500" },
    { label: "Pendentes", value: users.filter(u => u.status === "pending").length, icon: Clock, color: "bg-amber-50 text-amber-600" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {stats.map(s => (
        <div key={s.label} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.color}`}>
            <s.icon className="w-4 h-4" />
          </div>
          <div>
            <div
              className="text-foreground text-xl font-semibold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {s.value}
            </div>
            <div className="text-muted-foreground text-xs">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
