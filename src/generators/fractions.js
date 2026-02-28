const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const lcm = (a, b) => (a * b) / gcd(a, b);

const simplify = (n, d) => {
  const g = gcd(Math.abs(n), Math.abs(d));
  const sn = n / g;
  const sd = d / g;
  return sd === 1 ? `${sn}` : `${sn}/${sd}`;
};

export const generateFractions = () => {
  const mode = rand(0, 2);

  if (mode === 0) {
    const d = rand(3, 12);
    const n1 = rand(1, d - 1);
    const n2 = rand(1, d - 1);
    const sum = n1 + n2;
    return {
      question: `${n1}/${d} + ${n2}/${d}`,
      answer: simplify(sum, d),
      explanation: `Like denominator: (${n1}+${n2})/${d}=${sum}/${d} -> ${simplify(sum, d)}`,
      pattern: 'like denominators',
      meta: { chainLength: 1 }
    };
  }

  if (mode === 1) {
    let d1 = rand(3, 12);
    let d2 = rand(4, 20);
    if (d1 === d2) d2 = d2 === 20 ? 19 : d2 + 1;
    const n1 = rand(1, d1 - 1);
    const n2 = rand(1, d2 - 1);
    const den = lcm(d1, d2);
    const num = n1 * (den / d1) + n2 * (den / d2);
    return {
      question: `${n1}/${d1} + ${n2}/${d2}`,
      answer: simplify(num, den),
      explanation: `LCM(${d1},${d2})=${den}; ${n1}/${d1}=${n1 * (den / d1)}/${den}, ${n2}/${d2}=${n2 * (den / d2)}/${den}; total=${num}/${den} -> ${simplify(num, den)}`,
      pattern: 'unlike denominators',
      meta: { chainLength: 1 }
    };
  }

  const den1 = rand(3, 10);
  const den2 = rand(3, 10);
  const base1 = rand(3, 12);
  const base2 = rand(4, 15);
  const total1 = den1 * base1;
  const total2 = den2 * base2;
  const n1 = rand(1, den1 - 1);
  const n2 = rand(1, den2 - 1);
  const sub = rand(10, 80);
  const answer = n1 * base1 + n2 * base2 - sub;
  return {
    question: `(${n1}/${den1} of ${total1}) + (${n2}/${den2} of ${total2}) - ${sub}`,
    answer,
    explanation: `${n1}/${den1} of ${total1}=${n1 * base1}; ${n2}/${den2} of ${total2}=${n2 * base2}; ${n1 * base1}+${n2 * base2}-${sub}=${answer}`,
    pattern: 'fraction chain',
    meta: { chainLength: 3 }
  };
};
