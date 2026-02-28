import { generateBodmas } from './bodmas';
import { generateFractions } from './fractions';
import { generateSurds } from './surds';
import { generateApproximation } from './approximation';
import { generateMissingNumber } from './missingNumber';

const factories = {
  'BODMAS': () => generateBodmas('medium'),
  'Fractions & Decimals': generateFractions,
  'Surds & Indices': () => generateSurds('hard'),
  'Approximation': generateApproximation,
  'Missing Number': generateMissingNumber
};

export const generateMixed = (topicAccuracy = {}) => {
  const entries = Object.keys(factories).map((key) => {
    const acc = topicAccuracy[key] ?? 0.5;
    return { key, weight: 1 / (acc + 0.1) };
  });

  const totalWeight = entries.reduce((sum, entry) => sum + entry.weight, 0);
  let pick = Math.random() * totalWeight;

  const chosen = entries.find((entry) => {
    pick -= entry.weight;
    return pick <= 0;
  }) || entries[0];

  return {
    ...factories[chosen.key](),
    sourceTopic: chosen.key
  };
};
