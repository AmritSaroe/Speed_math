import { motion } from 'framer-motion';

export default function Button({ variant = 'primary', className = '', ...props }) {
  const styles = variant === 'primary' ? 'bg-accent text-white' : 'border border-[var(--border)]';
  return <motion.button whileTap={{ scale: 0.96 }} className={`rounded-xl px-4 py-2 font-medium ${styles} ${className}`} {...props} />;
}
