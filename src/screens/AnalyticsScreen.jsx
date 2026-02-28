import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card from '../components/ui/Card';
import { useAnalyticsStore } from '../store/useAnalyticsStore';

export default function AnalyticsScreen() {
  const [tab, setTab] = useState('overview');
  const { topicStats, daily, sessions } = useAnalyticsStore();
  const topicRows = useMemo(() => Object.entries(topicStats).map(([topic, v]) => ({ topic, acc: v.total ? Math.round((v.correct / v.total) * 100) : 0, avgTime: Number(v.avgTime.toFixed(1)), trend: v.trend.map((y, i) => ({ i, y })), weaknessTag: v.weaknessTag })), [topicStats]);
  return <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
    <div className="mb-4 flex gap-2">{['overview', 'topic', 'history'].map((t) => <button key={t} onClick={() => setTab(t)} className={`rounded-full px-3 ${tab===t?'bg-accent text-white':'border border-[var(--border)]'}`}>{t}</button>)}</div>
    {tab === 'overview' && <Card><p className="mb-2 flex items-center gap-2"><Flame size={16} /> Day Streak</p><div className="grid grid-cols-12 gap-1">{Array.from({ length: 84 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (83 - i)); const key = d.toISOString().slice(0,10); const v = daily[key] || 0; return <div key={key} className="h-3 rounded-sm" style={{ background: v ? '#6c63ff' : 'var(--border)', opacity: Math.min(1, 0.2 + v / 20) }} />; })}</div></Card>}
    {tab === 'topic' && <div className="space-y-3">{topicRows.map((r) => <Card key={r.topic}><p>{r.topic} — {r.acc}%</p><p className="text-xs text-[var(--muted)]">{r.weaknessTag}</p><div className="h-32"><ResponsiveContainer width="100%" height="100%"><LineChart data={r.trend}><Line dataKey="y" stroke="#6c63ff" /><Tooltip /></LineChart></ResponsiveContainer></div></Card>)}<Card><div className="h-48"><ResponsiveContainer width="100%" height="100%"><BarChart data={topicRows}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="topic" hide /><YAxis /><Tooltip /><Bar dataKey="avgTime" fill="#6c63ff" /></BarChart></ResponsiveContainer></div></Card></div>}
    {tab === 'history' && <div className="space-y-2">{sessions.map((s, i) => <Card key={i}><p>{new Date(s.date).toLocaleDateString()} - {s.topic}</p><p className="text-sm">{Math.round((s.correct/s.total)*100)}% | {s.avgTime.toFixed(1)}s | {s.total}Q</p></Card>)}</div>}
  </motion.div>;
}
