import { useMemo } from 'react';
import { useAnalyticsStore } from '../store/useAnalyticsStore';

const targets = { easy: 20, medium: 35, hard: 50 };
const order = ['easy', 'medium', 'hard'];

export const useAdaptiveDifficulty = (topic) => {
  const { difficultyByTopic, setTopicDifficulty } = useAnalyticsStore();
  const current = difficultyByTopic[topic] || 'easy';

  const evaluateDifficulty = (recent) => {
    const total = recent.length;
    if (!total) return { next: current, message: null };
    const accuracy = recent.filter((q) => q.correct).length / total;
    const avgSolveTime = recent.reduce((s, q) => s + q.time, 0) / total;
    const target = targets[current];
    let next = current;
    if (accuracy > 0.8 && avgSolveTime < target * 0.85) next = order[Math.min(order.indexOf(current) + 1, 2)];
    else if (accuracy < 0.6 || avgSolveTime > target * 1.8) next = order[Math.max(order.indexOf(current) - 1, 0)];
    if (next !== current) setTopicDifficulty(topic, next);
    return { next, message: next !== current ? (order.indexOf(next) > order.indexOf(current) ? `Level Up → ${next} 🎯` : `Adjusting → ${next}`) : null };
  };

  return useMemo(() => ({ current, evaluateDifficulty }), [current]);
};
