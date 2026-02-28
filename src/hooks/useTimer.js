import { useEffect, useState } from 'react';

export const useTimer = (duration, keyToken, onEnd) => {
  const [remaining, setRemaining] = useState(duration);
  useEffect(() => {
    setRemaining(duration);
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const next = Math.max(duration - elapsed, 0);
      setRemaining(next);
      if (next <= 0) {
        clearInterval(id);
        onEnd?.();
      }
    }, 100);
    return () => clearInterval(id);
  }, [duration, keyToken]);
  return remaining;
};
