import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import type { UserRecord } from '../../types';
import { USERS } from '../../data/users';
import TopBar from '@/shared/TopBar';
import UserStatsCards from './components/UserStatsCards';
import UsersTable from './components/UsersTable';
import UserModal from './components/UserModal';

type UserForm = {
  name: string;
  email: string;
  role: UserRecord['role'];
  department: string;
  status: UserRecord['status'];
};

export default function UsersView() {
  const [users, setUsers] = useState<UserRecord[]>(USERS);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState<UserRecord | null>(null);
  const [form, setForm] = useState<UserForm>({
    name: '',
    email: '',
    role: 'agent',
    department: '',
    status: 'active',
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
      name: '',
      email: '',
      role: 'agent',
      department: '',
      status: 'active',
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
        prev.map((u) => (u.id === editUser.id ? { ...u, ...form } : u))
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
          ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
          : u
      )
    );
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
          onDelete={(id) => setUsers((prev) => prev.filter((u) => u.id !== id))}
        />
      </div>

      {showModal && (
        <UserModal
          form={form}
          editUser={editUser}
          setForm={setForm}
          onSubmit={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
