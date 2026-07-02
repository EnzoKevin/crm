import { DollarSign, Users, Briefcase, Target } from "lucide-react";
import TopBar from "../../components/shared/TopBar";
import StatCard from "../../components/shared/StatCard";
import RevenueChart from "./components/RevenueChart";
import PipelineChart from "./components/PipelineChart";
import RecentDealsTable from "./components/RecentDealsTable";

export default function Dashboard() {
  return (
    <div className="flex-1 overflow-auto">
      <TopBar title="Dashboard" subtitle="Visão geral do desempenho — Junho 2026" />
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Receita este mês" value="R$ 134k" sub="Meta: R$ 100k" trend={{ value: 34, positive: true }} icon={DollarSign} color="bg-emerald-50 text-emerald-600" />
          <StatCard label="Novos contatos" value="47" sub="vs 38 mês anterior" trend={{ value: 23, positive: true }} icon={Users} color="bg-blue-50 text-blue-600" />
          <StatCard label="Negócios ativos" value="12" sub="Pipeline: R$ 525k" trend={{ value: 8, positive: true }} icon={Briefcase} color="bg-purple-50 text-purple-600" />
          <StatCard label="Taxa de conversão" value="38%" sub="Média setor: 29%" trend={{ value: 4, positive: true }} icon={Target} color="bg-amber-50 text-amber-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <RevenueChart />
          <PipelineChart />
        </div>

        <RecentDealsTable />
      </div>
    </div>
  );
}
