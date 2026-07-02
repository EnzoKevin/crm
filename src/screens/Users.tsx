import { useState } from "react";
import { Plus, Search } from "lucide-react";
import TopBar from "../pages/commons/TopBar";
import UserStatsCards from "../pages/users/components/UserStatsCards";
import UsersTable from "../pages/users/components/UsersTable";
import UserModal from "../pages/users/components/UserModal";
import { USERS } from "../data/users";
import type { UserRecord } from "../types";

export default function Users() {
  const [users, setUsers] = useState<UserRecord[]>(USERS);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState<UserRecord | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "agent" as UserRecord["role"],
    department: "",
    status: "active" as UserRecord["status"],
  });

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.department.toLowerCase().includes(q)
    );
  });

  const openAdd = () => {
    setEditUser(null);
    setForm({
      name: "",
      email: "",
      role: "agent",
      department: "",
      status: "active",
    });
    setShowModal(true);
  };
  const openEdit = (u: UserRecord) => {
    setEditUser(u);
    setForm({
      name: u.name,
      email: u.email,
      role: u.role,
      department: u.department,
      status: u.status,
    });
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editUser.id ? { ...u, ...form } : u)),
      );
    } else {
      setUsers((prev) => [
        ...prev,
        {
          id: `u${Date.now()}`,
          ...form,
          joinDate: new Date().toISOString().slice(0, 10),
          dealsCount: 0,
          revenueGenerated: 0,
        },
      ]);
    }
    setShowModal(false);
  };

  const toggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div className="flex-1 overflow-auto">
      <TopBar
        title="Usuários"
        subtitle="Gerenciamento de acesso e permissões"
        actions={
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-[#0EA47A] hover:bg-[#0d9470] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" /> Novo usuário
          </button>
        }
      />
      <div className="p-8">
        <UserStatsCards users={users} />

        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar usuários..."
              className="w-full bg-card border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#0EA47A] transition-colors"
            />
          </div>
        </div>

        <UsersTable
          filtered={filtered}
          onEdit={openEdit}
          onToggleStatus={toggleStatus}
          onDelete={handleDelete}
        />
      </div>

      {showModal && (
        <UserModal
          editUser={editUser}
          form={form}
          setForm={setForm}
          onSubmit={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
