import { X, Building2 } from "lucide-react";
import type { Deal } from "@/types";
import { fmt } from "@/lib/utils";

interface DealCardProps {
  deal: Deal;
  onDelete: (id: string) => void;
  onDragStart: (id: string) => void;
}

export default function DealCard({
  deal,
  onDelete,
  onDragStart,
}: DealCardProps) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(deal.id)}
      className="bg-card border border-border rounded-xl p-3.5 cursor-grab active:cursor-grabbing hover:shadow-md hover:border-[#1A3557]/20 transition-all"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-foreground font-medium text-xs leading-snug flex-1 pr-1">
          {deal.title}
        </h4>
        <button
          onClick={() => onDelete(deal.id)}
          className="text-muted-foreground hover:text-red-500 transition-colors shrink-0 mt-0.5"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
      <div className="text-muted-foreground text-[11px] mb-3 flex items-center gap-1">
        <Building2 className="w-3 h-3 shrink-0" />
        <span className="truncate">{deal.company}</span>
      </div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-foreground font-semibold text-sm font-mono">
          {fmt(deal.value)}
        </span>
      </div>
      <div className="text-muted-foreground text-[10px] font-mono mb-2">
        {deal.closeDate}
      </div>
      {deal.probability > 0 && deal.probability < 100 && (
        <div>
          <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
            <span>Prob.</span>
            <span className="font-semibold">{deal.probability}%</span>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0EA47A] rounded-full"
              style={{ width: `${deal.probability}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
