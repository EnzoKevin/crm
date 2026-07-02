interface NotificationsCardProps {
  notifEmail: boolean;
  setNotifEmail: (v: boolean) => void;
  notifPush: boolean;
  setNotifPush: (v: boolean) => void;
  notifWeekly: boolean;
  setNotifWeekly: (v: boolean) => void;
}

export default function NotificationsCard({
  notifEmail,
  setNotifEmail,
  notifPush,
  setNotifPush,
  notifWeekly,
  setNotifWeekly,
}: NotificationsCardProps) {
  const items = [
    {
      label: "E-mail",
      sub: "Alertas de novos leads e negócios",
      val: notifEmail,
      set: setNotifEmail,
    },
    {
      label: "Push",
      sub: "Alertas em tempo real no navegador",
      val: notifPush,
      set: setNotifPush,
    },
    {
      label: "Resumo semanal",
      sub: "Relatório toda segunda-feira",
      val: notifWeekly,
      set: setNotifWeekly,
    },
  ];

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="font-semibold text-foreground text-sm">Notificações</h3>
      </div>
      <div className="p-6 space-y-1">
        {items.map(({ label, sub, val, set }) => (
          <div
            key={label}
            className="flex items-center justify-between py-3 border-b border-border last:border-0"
          >
            <div>
              <div className="text-foreground text-sm font-medium">{label}</div>
              <div className="text-muted-foreground text-xs mt-0.5">{sub}</div>
            </div>
            <button
              onClick={() => set(!val)}
              className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${val ? "bg-[#0EA47A]" : "bg-muted"}`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${val ? "translate-x-5" : "translate-x-0.5"}`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
