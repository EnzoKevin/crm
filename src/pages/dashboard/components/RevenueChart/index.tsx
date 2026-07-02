import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { revenueData } from "@/data/charts";

export default function RevenueChart() {
  return (
    <div className="lg:col-span-2 bg-card rounded-xl p-5 border border-border">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-foreground font-semibold text-sm">
            Receita vs Meta
          </h3>
          <p className="text-muted-foreground text-xs mt-0.5">
            Evolução mensal — 2026
          </p>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0EA47A] bg-emerald-50 px-2 py-1 rounded-full">
          +34% este mês
        </span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={revenueData}
          margin={{ top: 0, right: 0, bottom: 0, left: -20 }}
        >
          <defs>
            <linearGradient id="receita" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0EA47A" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#0EA47A" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF2" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#6B7A94" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#6B7A94" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v / 1000}k`}
          />
          <Tooltip
            formatter={(v: number) => [`R$ ${(v / 1000).toFixed(0)}k`, ""]}
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: "1px solid #E8ECF2",
            }}
          />
          <Area
            type="monotone"
            dataKey="receita"
            stroke="#0EA47A"
            strokeWidth={2}
            fill="url(#receita)"
            name="Receita"
          />
          <Area
            type="monotone"
            dataKey="meta"
            stroke="#CBD5E1"
            strokeWidth={1.5}
            fill="none"
            strokeDasharray="4 2"
            name="Meta"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
