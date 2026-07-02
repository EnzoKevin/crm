export default function RegionCard() {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="font-semibold text-foreground text-sm">Fuso horário e região</h3>
      </div>
      <div className="p-6 grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
            Fuso horário
          </label>
          <select className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-[#0EA47A] transition-colors">
            <option>America/Sao_Paulo (GMT-3)</option>
            <option>America/Manaus (GMT-4)</option>
            <option>UTC</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
            Formato de data
          </label>
          <select className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-[#0EA47A] transition-colors">
            <option>DD/MM/AAAA</option>
            <option>MM/DD/YYYY</option>
            <option>AAAA-MM-DD</option>
          </select>
        </div>
      </div>
    </div>
  );
}
