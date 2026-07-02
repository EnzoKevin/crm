import type { Deal } from "../../../../types";
import { fmt } from "../../../../lib/utils";
import { stageLabels, stageAccentColors } from "../../../../data/deals";
import DealCard from "../DealCard";

interface KanbanColumnProps {
  stage: Deal["stage"];
  deals: Deal[];
  isLast: boolean;
  onDelete: (id: string) => void;
  onDragStart: (id: string) => void;
  onDrop: (stage: Deal["stage"]) => void;
}

export default function KanbanColumn({
  stage,
  deals,
  isLast,
  onDelete,
  onDragStart,
  onDrop,
}: KanbanColumnProps) {
  const totalValue = deals.reduce((s, d) => s + d.value, 0);

  return (
    <div
      className={`flex flex-col w-1/5 ${!isLast ? "border-r border-border" : ""}`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(stage)}
    >
      <div
        className={`border-t-[3px] ${stageAccentColors[stage]} bg-card px-4 pt-4 pb-3 border-b border-border`}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-foreground text-xs font-semibold uppercase tracking-wider">
            {stageLabels[stage]}
          </span>
          <span className="text-[11px] font-semibold bg-muted text-muted-foreground rounded-full w-5 h-5 flex items-center justify-center">
            {deals.length}
          </span>
        </div>
        <div className="text-foreground font-semibold text-base font-mono">
          {fmt(totalValue)}
        </div>
      </div>

      <div className="flex-1 bg-background p-3 space-y-2.5 overflow-y-auto">
        {deals.map((deal) => (
          <DealCard
            key={deal.id}
            deal={deal}
            onDelete={onDelete}
            onDragStart={onDragStart}
          />
        ))}
        {deals.length === 0 && (
          <div className="border-2 border-dashed border-border rounded-xl text-center text-muted-foreground text-xs h-20 flex items-center justify-center mt-1">
            Arraste aqui
          </div>
        )}
      </div>
    </div>
  );
}
