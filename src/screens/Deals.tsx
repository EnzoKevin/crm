import { useState } from "react";
import { Plus } from "lucide-react";
import TopBar from "../pages/commons/TopBar";
import KanbanColumn from "../pages/deals/components/KanbanColumn";
import DealModal from "../pages/deals/components/DealModal";
import { DEALS, STAGES } from "../data/deals";
import type { Deal } from "../types";

export default function Deals() {
  const [deals, setDeals] = useState<Deal[]>(DEALS);
  const [showModal, setShowModal] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    contact: "",
    company: "",
    value: "",
    stage: "prospecting" as Deal["stage"],
    closeDate: "",
  });

  const byStage = (stage: string) => deals.filter((d) => d.stage === stage);

  const handleDrop = (stage: Deal["stage"]) => {
    if (!dragId) return;
    setDeals((prev) =>
      prev.map((d) => (d.id === dragId ? { ...d, stage } : d)),
    );
    setDragId(null);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const nd: Deal = {
      id: `d${Date.now()}`,
      title: form.title,
      contact: form.contact,
      company: form.company,
      value: Number(form.value) || 0,
      stage: form.stage,
      probability:
        form.stage === "closed_won"
          ? 100
          : form.stage === "closed_lost"
            ? 0
            : 50,
      closeDate: form.closeDate,
      owner: "Admin Sistema",
    };
    setDeals((prev) => [nd, ...prev]);
    setShowModal(false);
    setForm({
      title: "",
      contact: "",
      company: "",
      value: "",
      stage: "prospecting",
      closeDate: "",
    });
  };

  const handleDelete = (id: string) => {
    setDeals((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <TopBar
        title="Negócios"
        subtitle="Pipeline de vendas — arraste para mover entre estágios"
        actions={
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#0EA47A] hover:bg-[#0d9470] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" /> Novo negócio
          </button>
        }
      />
      <div className="min-h-0 flex-1 overflow-x-auto overflow-y-auto bg-slate-50/70 p-5">
        <div className="flex h-full min-w-max gap-0">
          {STAGES.map((stage, idx) => (
            <KanbanColumn
              key={stage}
              stage={stage}
              deals={byStage(stage)}
              isLast={idx === STAGES.length - 1}
              onDrop={handleDrop}
              onDragStart={setDragId}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <DealModal
          form={form}
          setForm={setForm}
          onSubmit={handleAdd}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
