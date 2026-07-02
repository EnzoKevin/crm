import type { Deal } from "../types";

export const DEALS: Deal[] = [
  { id: "d1", title: "Licença Enterprise — TechCorp", contact: "Mariana Costa", company: "TechCorp Brasil", value: 48500, stage: "closed_won", probability: 100, closeDate: "2026-06-30", owner: "Ana Lima" },
  { id: "d2", title: "Consultoria Anual — InvestGroup", contact: "Rafael Mendes", company: "InvestGroup SA", value: 120000, stage: "negotiation", probability: 80, closeDate: "2026-07-15", owner: "Carlos Souza" },
  { id: "d3", title: "Plano Premium — GlobalNet", contact: "Fernanda Alves", company: "GlobalNet Telecom", value: 32000, stage: "proposal", probability: 55, closeDate: "2026-07-28", owner: "Ana Lima" },
  { id: "d4", title: "Renovação Contrato — Nexus", contact: "Bruno Teixeira", company: "Nexus Technology", value: 87000, stage: "closed_won", probability: 100, closeDate: "2026-06-15", owner: "Pedro Rocha" },
  { id: "d5", title: "Onboarding Starter — StartupX", contact: "Camila Ferreira", company: "StartupX", value: 15000, stage: "qualification", probability: 40, closeDate: "2026-08-01", owner: "Carlos Souza" },
  { id: "d6", title: "Integração API — FinTech", contact: "Isabela Rocha", company: "FinTech Brasil", value: 195000, stage: "negotiation", probability: 75, closeDate: "2026-07-10", owner: "Ana Lima" },
  { id: "d7", title: "Módulo Analytics — CloudServ", contact: "Lucas Oliveira", company: "CloudServ", value: 28000, stage: "prospecting", probability: 20, closeDate: "2026-09-01", owner: "Carlos Souza" },
  { id: "d8", title: "Suite Completa — MegaCorp", contact: "Diego Santos", company: "MegaCorp Ltda", value: 62000, stage: "closed_lost", probability: 0, closeDate: "2026-06-01", owner: "Pedro Rocha" },
];

export const STAGES = ["prospecting", "qualification", "proposal", "negotiation", "closed_won", "closed_lost"] as const;

export const stageLabels: Record<string, string> = {
  prospecting: "Prospecção",
  qualification: "Qualificação",
  proposal: "Proposta",
  negotiation: "Negociação",
  closed_won: "Ganho",
  closed_lost: "Perdido",
};

export const stageAccentColors: Record<string, string> = {
  prospecting: "border-t-slate-400",
  qualification: "border-t-blue-400",
  proposal: "border-t-amber-400",
  negotiation: "border-t-purple-400",
  closed_won: "border-t-emerald-500",
  closed_lost: "border-t-red-400",
};
