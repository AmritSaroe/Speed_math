import { Calculator } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <header className="flex items-center justify-between py-4">
      <div className="flex items-center gap-2 font-semibold"><Calculator className="text-accent" /> SpeedMath</div>
      <ThemeToggle />
    </header>
  );
}
