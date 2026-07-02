import { DEALS } from "@/data/deals";
import { stageAccentColors, stageLabels } from "@/data/deals";
import { fmt } from "@/lib/utils";

export default function RecentDealsTable() {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="text-foreground font-semibold text-sm">
          Negócios recentes
        </h3>
        <span className="text-[#0EA47A] text-xs font-medium hover:underline cursor-pointer">
          Ver todos
        </span>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/40">
            <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Negócio
            </th>
            <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Contato
            </th>
            <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Estágio
            </th>
            <th className="text-right px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Valor
            </th>
          </tr>
        </thead>
        <tbody>
          {DEALS.slice(0, 5).map((deal) => (
            <tr
              key={deal.id}
              className="border-t border-border hover:bg-muted/30 transition-colors"
            >
              <td className="px-5 py-3.5 font-medium text-foreground text-sm">
                {deal.title}
              </td>
              <td className="px-4 py-3.5 text-muted-foreground text-sm">
                {deal.contact}
              </td>
              <td className="px-4 py-3.5">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${stageAccentColors[deal.stage]}`}
                >
                  {stageLabels[deal.stage]}
                </span>
              </td>
              <td className="px-5 py-3.5 text-right font-medium text-foreground text-sm font-mono">
                {fmt(deal.value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
