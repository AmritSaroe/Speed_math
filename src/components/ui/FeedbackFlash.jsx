import { AnimatePresence, motion } from 'framer-motion';

export default function FeedbackFlash({ status }) {
  return <AnimatePresence>{status && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.95 }} exit={{ opacity: 0 }} className={`fixed inset-0 z-20 ${status==='correct'?'bg-green-500/20':'bg-red-500/20'}`} />}</AnimatePresence>;
}
