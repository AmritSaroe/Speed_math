const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const buildEasy = () => {
  const a = rand(10, 90);
  const b = rand(2, 12);
  const c = rand(2, 9);
  const d = rand(1, 9);
  const mult = b * c;
  const answer = a + mult / b - d;
  return {
    question: `${a} + ${mult} ÷ ${b} - ${d}`,
    answer,
    explanation: `${mult} ÷ ${b} = ${c}; ${a} + ${c} - ${d} = ${answer}`,
    pattern: 'flat',
    meta: { bracketDepth: 0 }
  };
};

const buildMedium = () => {
  const d = rand(2, 8);
  const c = rand(2, 5);
  const sum = rand(12, 48);
  const e = rand(4, 15);
  const insideA = rand(6, sum - 6);
  const insideB = sum - insideA;
  const answer = (sum * c) / d - e;
  return {
    question: `(${insideA} + ${insideB}) × ${c} ÷ ${d} - ${e}`,
    answer,
    explanation: `(${insideA}+${insideB})=${sum}; ${sum}×${c}=${sum * c}; ÷${d}=${(sum * c) / d}; -${e}=${answer}`,
    pattern: 'single bracket',
    meta: { bracketDepth: 1 }
  };
};

const buildHard = () => {
  const divisors = [6, 8, 9, 12];
  const a = divisors[rand(0, divisors.length - 1)];
  const p = rand(2, 5);
  const c = rand(2, 6);
  const q = rand(2, 8);
  const d = p * q;
  const left = 144 / a;
  const middle = p ** 2 * c;
  const right = d / p;
  const answer = left + middle - right;
  return {
    question: `[(144 ÷ ${a}) + (${p}² × ${c})] - ${d} ÷ ${p}`,
    answer,
    explanation: `144÷${a}=${left}; ${p}²×${c}=${middle}; ${d}÷${p}=${right}; ${left}+${middle}-${right}=${answer}`,
    pattern: 'nested brackets',
    meta: { bracketDepth: 2 }
  };
};

export const generateBodmas = (difficulty = 'easy') => {
  if (difficulty === 'hard') return buildHard();
  if (difficulty === 'medium') return buildMedium();
  return buildEasy();
};
