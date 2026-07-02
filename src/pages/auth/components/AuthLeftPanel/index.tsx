import { Target } from "lucide-react";

export default function AuthLeftPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between w-120 p-12 bg-[#0F1724] border-r border-white/5">
      <div>
        <div className="flex items-center gap-3 mb-16">
          <div className="w-9 h-9 rounded-lg bg-[#0EA47A] flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <span
            className="text-white font-semibold text-lg tracking-tight"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Nexus CRM
          </span>
        </div>
        <h1
          className="text-white text-4xl leading-tight mb-6"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
        >
          Gerencie seus relacionamentos com precisão.
        </h1>
        <p className="text-[#6B7A94] text-base leading-relaxed">
          Plataforma completa para equipes de vendas acompanharem leads,
          negócios e clientes em um único lugar.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Clientes ativos", value: "1.2k+" },
          { label: "Negócios fechados", value: "R$4.8M" },
          { label: "Taxa de conversão", value: "38%" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/5 rounded-xl p-4">
            <div
              className="text-white text-xl font-semibold mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {stat.value}
            </div>
            <div className="text-[#6B7A94] text-xs">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
