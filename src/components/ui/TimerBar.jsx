import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export default function TimerBar({ duration, keyToken, remaining }) {
  const controls = useAnimation();
  useEffect(() => {
    controls.set({ width: '100%' });
    controls.start({ width: '0%', transition: { duration, ease: 'linear' } });
  }, [duration, keyToken]);
  const pct = (remaining / duration) * 100;
  const color = pct > 50 ? 'var(--success)' : pct > 25 ? 'var(--warning)' : 'var(--danger)';
  return <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--border)]"><motion.div animate={controls} className="h-full" style={{ background: color }} /></div>;
}
