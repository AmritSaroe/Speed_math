import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const topics = [
  'BODMAS',
  'Fractions & Decimals',
  'Surds & Indices',
  'Approximation',
  'Missing Number',
  'Mixed Mode'
];

const initialSession = { topic: 'BODMAS', total: 20, mode: 'adaptive', manualDifficulty: 'easy' };

export const useAppStore = create(
  persist(
    (set) => ({
      theme: 'dark',
      sessionConfig: initialSession,
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
      setSessionConfig: (sessionConfig) => set({ sessionConfig })
    }),
    { name: 'speedmath-app' }
  )
);
