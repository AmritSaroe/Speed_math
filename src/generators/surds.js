const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateSurds = (difficulty = 'easy') => {
  if (difficulty === 'hard') {
    const mode = rand(0, 1);
    if (mode === 0) {
      const a = rand(3, 9);
      const b = rand(2, 5);
      const c = rand(2, 6);
      const answer = a + b * c;
      return {
        question: `√(${a ** 2}) + ∛(${b ** 3}) × ${c}`,
        answer,
        explanation: `√(${a ** 2})=${a}; ∛(${b ** 3})=${b}; ${b}×${c}=${b * c}; total=${answer}`,
        pattern: 'mixed surd',
        meta: { surdType: 'mixed' }
      };
    }
    const base = rand(2, 9);
    const m = rand(2, 4);
    const n = rand(2, 4);
    const answer = base ** (m + n);
    return {
      question: `${base}^${m} × ${base}^${n}`,
      answer,
      explanation: `a^m × a^n = a^(m+n) => ${base}^(${m + n}) = ${answer}`,
      pattern: 'index laws',
      meta: { surdType: 'index laws' }
    };
  }

  const mode = rand(0, 1);
  if (mode === 0) {
    const a = rand(2, 45);
    return {
      question: `√${a ** 2}`,
      answer: a,
      explanation: `Perfect square root: √${a ** 2}=${a}`,
      pattern: 'square root',
      meta: { surdType: 'square root' }
    };
  }

  const b = rand(2, 21);
  return {
    question: `∛${b ** 3}`,
    answer: b,
    explanation: `Perfect cube root: ∛${b ** 3}=${b}`,
    pattern: 'cube root',
    meta: { surdType: 'cube root' }
  };
};
