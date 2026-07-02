import type { UserRecord } from "../types";

export const USERS: UserRecord[] = [
  { id: "u1", name: "Admin Sistema", email: "admin@crm.com", role: "admin", status: "active", department: "TI", joinDate: "2024-01-10", dealsCount: 0, revenueGenerated: 0 },
  { id: "u2", name: "Ana Lima", email: "ana.lima@crm.com", role: "manager", status: "active", department: "Vendas", joinDate: "2024-03-15", dealsCount: 18, revenueGenerated: 512000 },
  { id: "u3", name: "Carlos Souza", email: "carlos.souza@crm.com", role: "agent", status: "active", department: "Vendas", joinDate: "2024-05-20", dealsCount: 12, revenueGenerated: 287000 },
  { id: "u4", name: "Pedro Rocha", email: "pedro.rocha@crm.com", role: "agent", status: "active", department: "Vendas", joinDate: "2024-07-08", dealsCount: 9, revenueGenerated: 198000 },
  { id: "u5", name: "Julia Martins", email: "julia.m@crm.com", role: "agent", status: "inactive", department: "Suporte", joinDate: "2025-01-12", dealsCount: 4, revenueGenerated: 76000 },
  { id: "u6", name: "Ricardo Neves", email: "ricardo.n@crm.com", role: "manager", status: "pending", department: "Marketing", joinDate: "2026-06-01", dealsCount: 0, revenueGenerated: 0 },
];
