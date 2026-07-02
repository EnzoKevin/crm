import { X } from "lucide-react";
import type { Deal } from "@/types/index";
import { STAGES, stageLabels } from "@/data/deals";

interface DealModalProps {
  form: {
    title: string;
    contact: string;
    company: string;
    value: string;
    stage: Deal["stage"];
    closeDate: string;
  };
  setForm: (f: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export default function DealModal({
  form,
  setForm,
  onSubmit,
  onClose,
}: DealModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md border border-border">
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2
            className="font-semibold text-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Novo negócio
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
              field: "title",
              label: "Título do negócio",
              placeholder: "Ex: Licença Enterprise",
            },
            {
              field: "contact",
              label: "Contato",
              placeholder: "Nome do contato",
            },
            {
              field: "company",
              label: "Empresa",
              placeholder: "Nome da empresa",
            },
            { field: "value", label: "Valor (R$)", placeholder: "50000" },
            {
              field: "closeDate",
              label: "Previsão de fechamento",
              placeholder: "2026-08-01",
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
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
              Estágio
            </label>
            <select
              value={form.stage}
              onChange={(e) =>
                setForm((prev: any) => ({
                  ...prev,
                  stage: e.target.value as Deal["stage"],
                }))
              }
              className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-[#0EA47A] transition-colors"
            >
              {STAGES.map((s) => (
                <option key={s} value={s}>
                  {stageLabels[s]}
                </option>
              ))}
            </select>
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
