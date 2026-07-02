import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { stageData } from "@/data/charts";
import { fmt } from "@/lib/utils";

export default function PipelineChart() {
  return (
    <div className="bg-card rounded-xl p-5 border border-border">
      <h3 className="text-foreground font-semibold text-sm mb-1">
        Pipeline por estágio
      </h3>
      <p className="text-muted-foreground text-xs mb-4">Valor total: R$ 525k</p>
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={stageData}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={70}
            paddingAngle={3}
            dataKey="value"
          >
            {stageData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v: number) => [`R$ ${(v / 1000).toFixed(0)}k`, ""]}
            contentStyle={{ fontSize: 11, borderRadius: 8 }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="space-y-1.5 mt-3">
        {stageData.map((s) => (
          <div
            key={s.name}
            className="flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: s.color }}
              />
              <span className="text-muted-foreground">{s.name}</span>
            </div>
            <span className="text-foreground font-medium font-mono text-[11px]">
              {fmt(s.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
