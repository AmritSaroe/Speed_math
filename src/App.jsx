import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import BottomNav from './components/layout/BottomNav';
import AnalyticsScreen from './screens/AnalyticsScreen';
import HomeScreen from './screens/HomeScreen';
import PracticeScreen from './screens/PracticeScreen';
import SessionEndScreen from './screens/SessionEndScreen';
import { useAppStore } from './store/useAppStore';

export default function App() {
  const location = useLocation();
  const theme = useAppStore((s) => s.theme);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('speedmath-theme', theme);
  }, [theme]);

  return (
    <div className="mx-auto min-h-screen max-w-app px-4 pb-20">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/practice" element={<PracticeScreen />} />
          <Route path="/session-end" element={<SessionEndScreen />} />
          <Route path="/analytics" element={<AnalyticsScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      <BottomNav />
    </div>
  );
}
