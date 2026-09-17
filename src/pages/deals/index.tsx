import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Deal } from '../../types';
import { DEALS, STAGES } from '../../data/deals';
import TopBar from '@/shared/TopBar';
import KanbanColumn from './components/KanbanColumn';
import DealModal from './components/DealModal';

export default function Deals() {
  const [deals, setDeals] = useState<Deal[]>(DEALS);
  const [showModal, setShowModal] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '',
    contact: '',
    company: '',
    value: '',
    stage: 'prospecting' as Deal['stage'],
    closeDate: '',
  });

  const byStage = (stage: string) => deals.filter((d) => d.stage === stage);

  const handleDrop = (stage: Deal['stage']) => {
    if (!dragId) return;
    setDeals((prev) =>
      prev.map((d) => (d.id === dragId ? { ...d, stage } : d))
    );
    setDragId(null);
  };

  const handleDelete = (id: string) => {
    setDeals((prev) => prev.filter((d) => d.id !== id));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setDeals((prev) => [
      {
        id: `d${Date.now()}`,
        title: form.title,
        contact: form.contact,
        company: form.company,
        value: Number(form.value) || 0,
        stage: form.stage,
        probability:
          form.stage === 'closed_won'
            ? 100
            : form.stage === 'closed_lost'
              ? 0
              : 50,
        closeDate: form.closeDate,
        owner: 'Admin Sistema',
      },
      ...prev,
    ]);
    setShowModal(false);
    setForm({
      title: '',
      contact: '',
      company: '',
      value: '',
      stage: 'prospecting',
      closeDate: '',
    });
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
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
      <div className="flex-1 overflow-x-auto overflow-y-auto p-5">
        <div
          className="flex gap-0 h-full min-w-max"
          style={{ minHeight: 'calc(100vh - 130px)' }}
        >
          {STAGES.map((stage, idx) => (
            <KanbanColumn
              key={stage}
              stage={stage}
              deals={byStage(stage)}
              isLast={idx === STAGES.length - 1}
              onDelete={handleDelete}
              onDragStart={setDragId}
              onDrop={handleDrop}
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
