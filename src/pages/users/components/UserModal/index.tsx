import { X } from "lucide-react";
import type { UserRecord } from "@/types";

interface UserModalProps {
  editUser: UserRecord | null;
  form: {
    name: string;
    email: string;
    role: UserRecord["role"];
    department: string;
    status: UserRecord["status"];
  };
  setForm: (f: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export default function UserModal({
  editUser,
  form,
  setForm,
  onSubmit,
  onClose,
}: UserModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md border border-border">
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2
            className="font-semibold text-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {editUser ? "Editar usuário" : "Novo usuário"}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          {[
            {
              field: "name",
              label: "Nome completo",
              placeholder: "Nome do usuário",
            },
            {
              field: "email",
              label: "E-mail",
              placeholder: "usuario@empresa.com",
            },
            {
              field: "department",
              label: "Departamento",
              placeholder: "Vendas",
            },
          ].map(({ field, label, placeholder }) => (
            <div key={field}>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
                {label}
              </label>
              <input
                required
                placeholder={placeholder}
                value={(form as any)[field]}
                onChange={(e) =>
                  setForm((prev: any) => ({ ...prev, [field]: e.target.value }))
                }
                className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-[#0EA47A] transition-colors"
              />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
                Cargo
              </label>
              <select
                value={form.role}
                onChange={(e) =>
                  setForm((prev: any) => ({
                    ...prev,
                    role: e.target.value as UserRecord["role"],
                  }))
                }
                className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-[#0EA47A] transition-colors"
              >
                <option value="admin">Administrador</option>
                <option value="manager">Gerente</option>
                <option value="agent">Agente</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((prev: any) => ({
                    ...prev,
                    status: e.target.value as UserRecord["status"],
                  }))
                }
                className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-[#0EA47A] transition-colors"
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
                <option value="pending">Pendente</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-border text-foreground rounded-lg py-2.5 text-sm font-medium hover:bg-muted transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#0EA47A] hover:bg-[#0d9470] text-white rounded-lg py-2.5 text-sm font-medium transition-colors"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
