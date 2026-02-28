import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAnalyticsStore } from '../store/useAnalyticsStore';

export default function SessionEndScreen() {
  const nav = useNavigate();
  const latest = useAnalyticsStore((s) => s.sessions[0]);
  useEffect(() => { if (latest) confetti({ particleCount: 120, spread: 90 }); }, []);
  if (!latest) return null;
  const acc = Math.round((latest.correct / latest.total) * 100);
  return <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
    <Card><p className="text-sm">Accuracy</p><p className="font-display text-4xl">{acc}%</p><p>Correct {latest.correct}/{latest.total}</p><p>Avg {latest.avgTime.toFixed(1)}s</p></Card>
    <div className="mt-4 space-y-2"><Button className="w-full" onClick={() => nav('/practice')}>Practice Again</Button><Button className="w-full" variant="ghost" onClick={() => nav('/')}>Change Topic</Button><Button className="w-full" variant="ghost" onClick={() => nav('/analytics')}>View Analytics</Button></div>
  </motion.div>;
}
