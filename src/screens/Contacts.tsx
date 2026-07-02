import { useState, useMemo } from "react";
import { Plus, Search, Download, Trash2 } from "lucide-react";
import TopBar from "../pages/commons/TopBar";
import ContactsTable from "../pages/contacts/components/ContactsTable";
import ContactModal from "../pages/contacts/components/ContactModal";
import { CONTACTS } from "../data/contacts";
import type { Contact } from "../types";

export default function Contacts() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "value" | "lastContact">(
    "name",
  );
  const [sortAsc, setSortAsc] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [contacts, setContacts] = useState<Contact[]>(CONTACTS);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "lead" as Contact["status"],
  });

  const filtered = useMemo(() => {
    let data = contacts.filter((c) => {
      const q = search.toLowerCase();
      if (
        q &&
        !c.name.toLowerCase().includes(q) &&
        !c.email.toLowerCase().includes(q) &&
        !c.company.toLowerCase().includes(q)
      )
        return false;
      if (filter !== "all" && c.status !== filter) return false;
      return true;
    });
    data = [...data].sort((a, b) => {
      let val = 0;
      if (sortBy === "name") val = a.name.localeCompare(b.name);
      else if (sortBy === "value") val = a.value - b.value;
      else val = a.lastContact.localeCompare(b.lastContact);
      return sortAsc ? val : -val;
    });
    return data;
  }, [contacts, search, filter, sortBy, sortAsc]);

  const toggleSort = (col: typeof sortBy) => {
    if (sortBy === col) setSortAsc(!sortAsc);
    else {
      setSortBy(col);
      setSortAsc(true);
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const nc: Contact = {
      ...form,
      id: `c${Date.now()}`,
      value: 0,
      lastContact: new Date().toISOString().slice(0, 10),
      assignedTo: "Admin",
    };
    setContacts((prev) => [nc, ...prev]);
    setShowModal(false);
    setForm({ name: "", email: "", phone: "", company: "", status: "lead" });
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setSelected(checked ? new Set(filtered.map((c) => c.id)) : new Set());
  };

  const handleDelete = (id: string) => {
    setContacts((prev) => prev.filter((x) => x.id !== id));
    setSelected((prev) => {
      const n = new Set(prev);
      n.delete(id);
      return n;
    });
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
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar contatos..."
              className="w-full bg-card border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#0EA47A] transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            {["all", "lead", "prospect", "customer", "inactive"].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === s ? "bg-[#1A3557] text-white" : "bg-card border border-border text-muted-foreground hover:text-foreground"}`}
              >
                {s === "all"
                  ? "Todos"
                  : s === "lead"
                    ? "Lead"
                    : s === "prospect"
                      ? "Prospect"
                      : s === "customer"
                        ? "Cliente"
                        : "Inativo"}
              </button>
            ))}
          </div>
          <button className="ml-auto flex items-center gap-2 border border-border rounded-lg px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Download className="w-3.5 h-3.5" /> Exportar
          </button>
        </div>

        {selected.size > 0 && (
          <div className="flex items-center gap-3 mb-4 bg-[#1A3557]/10 border border-[#1A3557]/20 rounded-lg px-4 py-2.5">
            <span className="text-sm font-medium text-foreground">
              {selected.size} selecionado(s)
            </span>
            <button
              onClick={() => {
                setContacts((prev) => prev.filter((c) => !selected.has(c.id)));
                setSelected(new Set());
              }}
              className="flex items-center gap-1.5 text-red-500 text-sm hover:underline ml-auto"
            >
              <Trash2 className="w-3.5 h-3.5" /> Excluir selecionados
            </button>
          </div>
        )}

        <ContactsTable
          filtered={filtered}
          selected={selected}
          sortBy={sortBy}
          sortAsc={sortAsc}
          toggleSort={toggleSort}
          toggleSelect={toggleSelect}
          onSelectAll={handleSelectAll}
          onDelete={handleDelete}
        />
      </div>

      {showModal && (
        <ContactModal
          form={form}
          setForm={setForm}
          onSubmit={handleAdd}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
