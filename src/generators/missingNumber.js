const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateMissingNumber = () => {
  const mode = rand(0, 1);

  if (mode === 0) {
    const x = rand(2, 18);
    const m = rand(3, 12);
    const k = rand(10, x * m - 1);
    const rhs = x * m - k;
    return {
      question: `? × ${m} - ${k} = ${rhs}`,
      answer: x,
      explanation: `?×${m}=${rhs + k}; ?=${(rhs + k)}/${m}=${x}`,
      pattern: 'linear missing'
    };
  }

  const p = rand(3, 14);
  const right = rand(30, 80);
  const rhs = right ** 2;
  const answer = (right - p) ** 2;
  return {
    question: `√? + ${p} = √${rhs}`,
    answer,
    explanation: `√${rhs}=${right}; √?=${right}-${p}=${right - p}; ?=${(right - p) ** 2}`,
    pattern: 'surd missing'
  };
};
