import { motion } from 'framer-motion';
import { Activity, Sigma, SquareRoot, Target, CircleHelp, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import StatCard from '../components/ui/StatCard';
import Navbar from '../components/layout/Navbar';
import { topics, useAppStore } from '../store/useAppStore';
import { useAnalyticsStore } from '../store/useAnalyticsStore';

const icons = [Activity, Sigma, SquareRoot, Target, CircleHelp, Layers];

export default function HomeScreen() {
  const nav = useNavigate();
  const setSessionConfig = useAppStore((s) => s.setSessionConfig);
  const { topicStats, sessions } = useAnalyticsStore();
  const totals = sessions.reduce((a, s) => ({ q: a.q + s.total, t: a.t + s.duration }), { q: 0, t: 0 });
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
      <Navbar />
      <p className="text-sm text-[var(--muted)]">Train smarter. Beat the exam.</p>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
        {topics.map((topic, i) => {
          const Icon = icons[i];
          const stat = topicStats[topic] || { correct: 0, total: 0, trend: [] };
          const acc = stat.total ? Math.round((stat.correct / stat.total) * 100) : 0;
          const color = acc > 75 ? 'text-green-500' : acc >= 50 ? 'text-amber-500' : 'text-red-500';
          return (
            <motion.div key={topic} whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Card>
                <div className="flex items-center gap-2"><Icon size={16} /> <h3 className="text-sm font-semibold">{topic}</h3></div>
                <p className={`mt-1 text-xs ${color}`}>Accuracy: {acc}%</p>
                {acc < 60 && <span className="mt-1 inline-block rounded-full bg-red-500/20 px-2 py-0.5 text-xs text-red-400">Needs Work</span>}
                <p className="mt-1 text-xs text-[var(--muted)]">{stat.weaknessTag}</p>
                <Button className="mt-3 w-full" onClick={() => { setSessionConfig({ topic, total: 20, mode: 'adaptive', manualDifficulty: 'easy' }); nav('/practice'); }}>Practice</Button>
              </Card>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
        <StatCard label="Total Solved" value={totals.q} />
        <StatCard label="Day Streak" value={1} />
        <StatCard label="Best Accuracy" value={`${Math.max(0, ...sessions.map((s) => Math.round((s.correct / s.total) * 100)), 0)}%`} />
        <StatCard label="Practice Time" value={`${Math.round(totals.t / 60)}m`} />
      </div>
    </motion.div>
  );
}
