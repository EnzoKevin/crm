export default function DangerZoneCard() {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="font-semibold text-foreground text-sm">Zona de perigo</h3>
      </div>
      <div className="p-6 space-y-3">
        <p className="text-muted-foreground text-xs leading-relaxed">
          Ações irreversíveis que afetam permanentemente sua conta. Prossiga com cautela.
        </p>
        <div className="flex items-center gap-3 pt-1">
          <button className="border border-amber-300 text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-lg text-xs font-medium transition-colors">
            Exportar dados
          </button>
          <button className="border border-red-200 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg text-xs font-medium transition-colors">
            Excluir conta
          </button>
        </div>
      </div>
    </div>
  );
}
