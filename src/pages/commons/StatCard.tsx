import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  trend?: { value: number; positive: boolean };
  icon: React.ElementType;
  color: string;
}

export default function StatCard({ label, value, sub, trend, icon: Icon, color }: StatCardProps) {
  return (
    <div className="bg-card rounded-xl p-5 border border-border">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trend.positive ? "text-emerald-600" : "text-red-500"}`}>
            {trend.positive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <div className="text-foreground text-2xl font-semibold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{value}</div>
      <div className="text-muted-foreground text-xs">{label}</div>
      {sub && <div className="text-muted-foreground text-xs mt-1">{sub}</div>}
    </div>
  );
}
