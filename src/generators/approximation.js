const rand = (min, max) => Math.random() * (max - min) + min;
const roundEasy = (n) => Math.round(n / 10) * 10;

export const generateApproximation = () => {
  const a = rand(120, 980), b = rand(5, 40), c = rand(3, 25);
  const exact = (a * b) / c;
  const ra = roundEasy(a), rb = Math.round(b), rc = Math.max(1, Math.round(c));
  const approx = (ra * rb) / rc;
  return {
    question: `${a.toFixed(2)} × ${b.toFixed(2)} ÷ ${c.toFixed(2)} ≈ ?`,
    answer: Number(exact.toFixed(2)),
    explanation: `Round to ${ra}×${rb}÷${rc}≈${approx.toFixed(2)}; exact≈${exact.toFixed(2)}`,
    tolerance: 0.02,
    pattern: 'rounding'
  };
};
