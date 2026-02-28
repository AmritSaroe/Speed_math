import Card from './Card';

export default function StatCard({ label, value }) {
  return <Card className="text-center"><p className="text-xs text-[var(--muted)]">{label}</p><p className="font-display tabular-nums text-xl">{value}</p></Card>;
}
