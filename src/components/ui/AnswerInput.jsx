import { useEffect, useRef } from 'react';
import Button from './Button';

export default function AnswerInput({ value, onChange, onSubmit }) {
  const ref = useRef(null);
  useEffect(() => ref.current?.focus(), [onSubmit]);
  return (
    <form className="mt-4 flex gap-2" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <input ref={ref} inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30" />
      <Button type="submit">Done</Button>
    </form>
  );
}
