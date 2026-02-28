import { Moon, Sun } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useAppStore();
  return (
    <button className="rounded-xl border border-[var(--border)] px-3" onClick={toggleTheme} aria-label="toggle theme">
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
