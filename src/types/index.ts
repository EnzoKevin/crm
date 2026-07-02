export type View = "login" | "register" | "dashboard" | "contacts" | "deals" | "users" | "settings";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "agent";
  avatar: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "lead" | "prospect" | "customer" | "inactive";
  value: number;
  lastContact: string;
  assignedTo: string;
}

export interface Deal {
  id: string;
  title: string;
  contact: string;
  company: string;
  value: number;
  stage: "prospecting" | "qualification" | "proposal" | "negotiation" | "closed_won" | "closed_lost";
  probability: number;
  closeDate: string;
  owner: string;
}

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "agent";
  status: "active" | "inactive" | "pending";
  department: string;
  joinDate: string;
  dealsCount: number;
  revenueGenerated: number;
}
