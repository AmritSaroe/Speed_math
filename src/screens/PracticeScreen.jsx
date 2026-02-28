import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import TimerBar from '../components/ui/TimerBar';
import QuestionDisplay from '../components/ui/QuestionDisplay';
import AnswerInput from '../components/ui/AnswerInput';
import FeedbackFlash from '../components/ui/FeedbackFlash';
import Button from '../components/ui/Button';
import StreakBadge from '../components/ui/StreakBadge';
import { useAppStore } from '../store/useAppStore';
import { useAnalyticsStore } from '../store/useAnalyticsStore';
import { useAdaptiveDifficulty } from '../hooks/useAdaptiveDifficulty';
import { useSession } from '../hooks/useSession';
import { useTimer } from '../hooks/useTimer';

export default function PracticeScreen() {
  const nav = useNavigate();
  const cfg = useAppStore((s) => s.sessionConfig);
  const stats = useAnalyticsStore((s) => s.topicStats);
  const [feedback, setFeedback] = useState(null);
  const [answer, setAnswer] = useState('');
  const [startedAt, setStartedAt] = useState(Date.now());
  const [toast, setToast] = useState('');
  const { current, evaluateDifficulty } = useAdaptiveDifficulty(cfg.topic);
  const difficulty = cfg.mode === 'adaptive' ? current : cfg.manualDifficulty;
  const topicAccuracy = useMemo(() => Object.fromEntries(Object.entries(stats).map(([k, v]) => [k, v.total ? v.correct / v.total : 0.5])), [stats]);
  const { index, question, streak, records, submit } = useSession({ topic: cfg.topic, total: cfg.total, difficulty, topicAccuracy });
  const addSession = useAnalyticsStore((s) => s.addSession);
  const remaining = useTimer(difficulty === 'hard' ? 50 : difficulty === 'medium' ? 35 : 20, `${index}`, () => onSubmit(true));

  const onSubmit = (timedOut = false) => {
    const elapsed = (Date.now() - startedAt) / 1000;
    const res = submit(timedOut ? '' : answer, elapsed);
    setFeedback(res.correct ? 'correct' : 'wrong');
    setTimeout(() => setFeedback(null), 800);
    const recent = [...records, res.record].slice(-20);
    const evalRes = evaluateDifficulty(recent);
    if (evalRes.message) {
      setToast(evalRes.message);
      setTimeout(() => setToast(''), 1400);
    }
    setAnswer('');
    setStartedAt(Date.now());
    if (res.done) {
      const correct = recent.filter((r) => r.correct).length;
      const avgTime = recent.reduce((s, r) => s + r.time, 0) / recent.length;
      addSession({ topic: cfg.topic, total: recent.length, correct, avgTime, duration: recent.reduce((s, r) => s + r.time, 0), records: recent, weaknessTag: 'Slow on nested brackets', date: Date.now() });
      nav('/session-end');
    }
  };

  return <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
    <div className="mb-2 flex items-center justify-between text-sm"><span>{cfg.topic}</span><span>Q {Math.min(index + 1, cfg.total)} / {cfg.total}</span><StreakBadge streak={streak} /></div>
    <TimerBar duration={difficulty === 'hard' ? 50 : difficulty === 'medium' ? 35 : 20} remaining={remaining} keyToken={index} />
    <Card className="mt-4"><QuestionDisplay question={question.question} number={index + 1} /></Card>
    <AnswerInput value={answer} onChange={setAnswer} onSubmit={() => onSubmit(false)} />
    <Button variant="ghost" className="mt-4 w-full" onClick={() => nav('/')}>End Session</Button>
    {toast && <div className="fixed left-1/2 top-8 -translate-x-1/2 rounded-full bg-[var(--surface)] px-3 py-1 text-sm">{toast}</div>}
    <FeedbackFlash status={feedback} />
  </motion.div>;
}
