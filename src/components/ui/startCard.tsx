export function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-card rounded-xl border border-border p-4 sm:p-5">
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-2xl sm:text-3xl font-bold text-foreground">{value}</p>
    </div>
  )
}