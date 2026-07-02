import { useState, useMemo } from "react";
import { Search, Plus, Download, Trash2 } from "lucide-react";
import type { Contact } from "../../types";
import { CONTACTS } from "../../data/contacts";
import TopBar from "../../components/shared/TopBar";
import ContactsTable from "./components/ContactsTable";
import ContactModal from "./components/ContactModal";

type SortCol = "name" | "value" | "lastContact";

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>(CONTACTS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState<SortCol>("name");
  const [sortAsc, setSortAsc] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "", status: "lead" as Contact["status"],
  });

  const filtered = useMemo(() => {
    let data = contacts.filter(c => {
      const q = search.toLowerCase();
      if (q && !c.name.toLowerCase().includes(q) && !c.email.toLowerCase().includes(q) && !c.company.toLowerCase().includes(q)) return false;
      if (filter !== "all" && c.status !== filter) return false;
      return true;
    });
    return [...data].sort((a, b) => {
      const val =
        sortBy === "name" ? a.name.localeCompare(b.name) :
        sortBy === "value" ? a.value - b.value :
        a.lastContact.localeCompare(b.lastContact);
      return sortAsc ? val : -val;
    });
  }, [contacts, search, filter, sortBy, sortAsc]);

  const toggleSort = (col: SortCol) => {
    if (sortBy === col) setSortAsc(!sortAsc);
    else { setSortBy(col); setSortAsc(true); }
  };

  const toggleSelect = (id: string) => {
    setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const handleSelectAll = (checked: boolean) => {
    setSelected(checked ? new Set(filtered.map(c => c.id)) : new Set());
  };

  const handleDelete = (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
    setSelected(prev => { const n = new Set(prev); n.delete(id); return n; });
  };

  const handleDeleteSelected = () => {
    setContacts(prev => prev.filter(c => !selected.has(c.id)));
    setSelected(new Set());
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setContacts(prev => [{
      ...form,
      id: `c${Date.now()}`,
      value: 0,
      lastContact: new Date().toISOString().slice(0, 10),
      assignedTo: "Admin",
    }, ...prev]);
    setShowModal(false);
    setForm({ name: "", email: "", phone: "", company: "", status: "lead" });
  };

  const statusFilterLabels: Record<string, string> = {
    all: "Todos", lead: "Lead", prospect: "Prospect", customer: "Cliente", inactive: "Inativo",
  };

  return (
    <div className="flex-1 overflow-auto">
      <TopBar
        title="Contatos"
        subtitle={`${contacts.length} contatos cadastrados`}
        actions={
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#0EA47A] hover:bg-[#0d9470] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" /> Novo contato
          </button>
        }
      />
      <div className="p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar contatos..."
              className="w-full bg-card border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#0EA47A] transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            {Object.entries(statusFilterLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filter === key ? "bg-[#1A3557] text-white" : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button className="ml-auto flex items-center gap-2 border border-border rounded-lg px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Download className="w-3.5 h-3.5" /> Exportar
          </button>
        </div>

        {selected.size > 0 && (
          <div className="flex items-center gap-3 mb-4 bg-[#1A3557]/10 border border-[#1A3557]/20 rounded-lg px-4 py-2.5">
            <span className="text-sm font-medium text-foreground">{selected.size} selecionado(s)</span>
            <button
              onClick={handleDeleteSelected}
              className="flex items-center gap-1.5 text-red-500 text-sm hover:underline ml-auto"
            >
              <Trash2 className="w-3.5 h-3.5" /> Excluir selecionados
            </button>
          </div>
        )}

        <ContactsTable
          contacts={contacts}
          filtered={filtered}
          selected={selected}
          sortBy={sortBy}
          sortAsc={sortAsc}
          onToggleSort={toggleSort}
          onToggleSelect={toggleSelect}
          onSelectAll={handleSelectAll}
          onDelete={handleDelete}
        />
      </div>

      {showModal && (
        <ContactModal
          form={form}
          onChange={setForm}
          onSubmit={handleAdd}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
