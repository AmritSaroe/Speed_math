export default function QuestionDisplay({ question, number }) {
  const parts = question.split('?');
  return (
    <div className="text-center">
      <p className="text-xs text-[var(--muted)]">Question {number}</p>
      <h2 className="font-display mt-2 text-[2rem] font-semibold md:text-[2.8rem]">{parts.map((p, i) => <span key={i}>{p}{i < parts.length - 1 && <span className="text-accent">?</span>}</span>)}</h2>
    </div>
  );
}
