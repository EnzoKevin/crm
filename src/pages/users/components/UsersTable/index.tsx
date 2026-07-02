import { Edit2, XCircle, CheckCircle2, Trash2 } from "lucide-react";
import type { UserRecord } from "@/types";
import {
  initials,
  statusColors,
  roleColors,
  roleLabels,
  fmt,
} from "@/lib/utils";

interface UsersTableProps {
  filtered: UserRecord[];
  onEdit: (u: UserRecord) => void;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function UsersTable({
  filtered,
  onEdit,
  onToggleStatus,
  onDelete,
}: UsersTableProps) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/40 border-b border-border">
            {[
              "Usuário",
              "Cargo",
              "Departamento",
              "Status",
              "Negócios",
              "Receita gerada",
              "Desde",
              "Ações",
            ].map((h) => (
              <th
                key={h}
                className={`px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground ${h === "Receita gerada" || h === "Negócios" ? "text-right" : "text-left"}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr
              key={u.id}
              className="border-t border-border hover:bg-muted/30 transition-colors"
            >
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1A3557] flex items-center justify-center text-[#0EA47A] text-xs font-semibold shrink-0">
                    {initials(u.name)}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{u.name}</div>
                    <div className="text-muted-foreground text-xs">
                      {u.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-5 py-3.5">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${roleColors[u.role]}`}
                >
                  {roleLabels[u.role]}
                </span>
              </td>
              <td className="px-5 py-3.5 text-muted-foreground text-sm">
                {u.department}
              </td>
              <td className="px-5 py-3.5">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[u.status]}`}
                >
                  {u.status === "active"
                    ? "Ativo"
                    : u.status === "inactive"
                      ? "Inativo"
                      : "Pendente"}
                </span>
              </td>
              <td className="px-5 py-3.5 text-right text-foreground font-mono text-xs">
                {u.dealsCount}
              </td>
              <td className="px-5 py-3.5 text-right text-foreground font-mono text-xs">
                {fmt(u.revenueGenerated)}
              </td>
              <td className="px-5 py-3.5 text-muted-foreground text-xs font-mono">
                {u.joinDate}
              </td>
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(u)}
                    className="text-muted-foreground hover:text-[#1A3557] transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onToggleStatus(u.id)}
                    className={`transition-colors ${u.status === "active" ? "text-muted-foreground hover:text-red-500" : "text-muted-foreground hover:text-emerald-600"}`}
                  >
                    {u.status === "active" ? (
                      <XCircle className="w-3.5 h-3.5" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => onDelete(u.id)}
                    className="text-muted-foreground hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td
                colSpan={8}
                className="px-5 py-12 text-center text-muted-foreground text-sm"
              >
                Nenhum usuário encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
