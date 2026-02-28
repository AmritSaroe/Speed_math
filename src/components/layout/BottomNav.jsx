import { BarChart3, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const { pathname } = useLocation();
  const item = (to, label, icon) => <Link to={to} className={`flex flex-col items-center text-xs ${pathname===to?'text-accent':'text-[var(--muted)]'}`}>{icon}<span>{label}</span></Link>;
  return <nav className="fixed bottom-0 left-0 right-0 mx-auto flex max-w-app justify-around border-t border-[var(--border)] bg-[var(--surface)] p-2">{item('/', 'Home', <Home size={16} />)}{item('/analytics', 'Analytics', <BarChart3 size={16} />)}</nav>;
}
