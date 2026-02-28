import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { topics } from './useAppStore';

const mk = () => Object.fromEntries(topics.map((t) => [t, { correct: 0, total: 0, avgTime: 0, trend: [], weaknessTag: 'Balanced' }]));

export const useAnalyticsStore = create(
  persist(
    (set, get) => ({
      topicStats: mk(),
      sessions: [],
      daily: {},
      difficultyByTopic: {},
      addSession: (session) => {
        const state = get();
        const ts = { ...state.topicStats };
        const curr = ts[session.topic];
        const total = curr.total + session.total;
        const correct = curr.correct + session.correct;
        ts[session.topic] = {
          ...curr,
          total,
          correct,
          avgTime: total ? ((curr.avgTime * curr.total + session.avgTime * session.total) / total) : 0,
          trend: [...curr.trend, Math.round((session.correct / session.total) * 100)].slice(-20),
          weaknessTag: session.weaknessTag || curr.weaknessTag
        };
        const day = new Date().toISOString().slice(0, 10);
        set({
          topicStats: ts,
          sessions: [session, ...state.sessions].slice(0, 200),
          daily: { ...state.daily, [day]: (state.daily[day] || 0) + session.total }
        });
      },
      setTopicDifficulty: (topic, level) => set((s) => ({ difficultyByTopic: { ...s.difficultyByTopic, [topic]: level } }))
    }),
    { name: 'speedmath-analytics' }
  )
);
