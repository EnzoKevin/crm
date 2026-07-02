import { Building2, ChevronUp, ChevronDown, Trash2 } from "lucide-react";
import type { Contact } from "@/types";
import { initials, statusColors, fmt } from "@/lib/utils";

interface ContactsTableProps {
  filtered: Contact[];
  selected: Set<string>;
  sortBy: "name" | "value" | "lastContact";
  sortAsc: boolean;
  toggleSort: (col: "name" | "value" | "lastContact") => void;
  toggleSelect: (id: string) => void;
  onSelectAll: (checked: boolean) => void;
  onDelete: (id: string) => void;
}

export default function ContactsTable({
  filtered,
  selected,
  sortBy,
  sortAsc,
  toggleSort,
  toggleSelect,
  onSelectAll,
  onDelete,
}: ContactsTableProps) {
  const SortIcon = ({ col }: { col: typeof sortBy }) =>
    sortBy === col ? (
      sortAsc ? (
        <ChevronUp className="w-3 h-3" />
      ) : (
        <ChevronDown className="w-3 h-3" />
      )
    ) : null;

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/40 border-b border-border">
            <th className="px-4 py-3 w-10">
              <input
                type="checkbox"
                className="rounded"
                onChange={(e) => onSelectAll(e.target.checked)}
                checked={
                  selected.size === filtered.length && filtered.length > 0
                }
              />
            </th>
            <th
              className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer select-none"
              onClick={() => toggleSort("name")}
            >
              <div className="flex items-center gap-1">
                Nome <SortIcon col="name" />
              </div>
            </th>
            <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Empresa
            </th>
            <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Status
            </th>
            <th
              className="text-right px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer select-none"
              onClick={() => toggleSort("value")}
            >
              <div className="flex items-center justify-end gap-1">
                Valor <SortIcon col="value" />
              </div>
            </th>
            <th
              className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer select-none"
              onClick={() => toggleSort("lastContact")}
            >
              <div className="flex items-center gap-1">
                Último contato <SortIcon col="lastContact" />
              </div>
            </th>
            <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Responsável
            </th>
            <th className="px-4 py-3 w-10" />
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => (
            <tr
              key={c.id}
              className={`border-t border-border hover:bg-muted/30 transition-colors ${selected.has(c.id) ? "bg-blue-50/50" : ""}`}
            >
              <td className="px-4 py-3.5">
                <input
                  type="checkbox"
                  className="rounded"
                  checked={selected.has(c.id)}
                  onChange={() => toggleSelect(c.id)}
                />
              </td>
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#EDF1F7] flex items-center justify-center text-[#1A3557] text-xs font-semibold shrink-0">
                    {initials(c.name)}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{c.name}</div>
                    <div className="text-muted-foreground text-xs">
                      {c.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Building2 className="w-3.5 h-3.5" />
                  <span className="text-sm">{c.company}</span>
                </div>
              </td>
              <td className="px-4 py-3.5">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[c.status]}`}
                >
                  {c.status === "lead"
                    ? "Lead"
                    : c.status === "prospect"
                      ? "Prospect"
                      : c.status === "customer"
                        ? "Cliente"
                        : "Inativo"}
                </span>
              </td>
              <td className="px-4 py-3.5 text-right font-medium text-foreground font-mono text-xs">
                {fmt(c.value)}
              </td>
              <td className="px-4 py-3.5 text-muted-foreground text-xs font-mono">
                {c.lastContact}
              </td>
              <td className="px-4 py-3.5 text-muted-foreground text-sm">
                {c.assignedTo}
              </td>
              <td className="px-4 py-3.5">
                <button
                  onClick={() => onDelete(c.id)}
                  className="text-muted-foreground hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td
                colSpan={8}
                className="px-5 py-12 text-center text-muted-foreground text-sm"
              >
                Nenhum contato encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
