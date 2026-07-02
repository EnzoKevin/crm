export const fmt = (n: number) =>
  n >= 1000000
    ? `R$ ${(n / 1000000).toFixed(1)}M`
    : n >= 1000
    ? `R$ ${(n / 1000).toFixed(0)}k`
    : `R$ ${n}`;

export function initials(name: string) {
  return name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

export const statusColors: Record<string, string> = {
  lead: "bg-blue-100 text-blue-700",
  prospect: "bg-amber-100 text-amber-700",
  customer: "bg-emerald-100 text-emerald-700",
  inactive: "bg-slate-100 text-slate-500",
  active: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
};

export const stageColors: Record<string, string> = {
  prospecting: "bg-slate-100 text-slate-600",
  qualification: "bg-blue-100 text-blue-700",
  proposal: "bg-amber-100 text-amber-700",
  negotiation: "bg-purple-100 text-purple-700",
  closed_won: "bg-emerald-100 text-emerald-700",
  closed_lost: "bg-red-100 text-red-600",
};

export const roleLabels: Record<string, string> = {
  admin: "Administrador",
  manager: "Gerente",
  agent: "Agente",
};

export const roleColors: Record<string, string> = {
  admin: "bg-purple-100 text-purple-700",
  manager: "bg-blue-100 text-blue-700",
  agent: "bg-slate-100 text-slate-600",
};
