import { generateBodmas } from './bodmas';
import { generateFractions } from './fractions';
import { generateSurds } from './surds';
import { generateApproximation } from './approximation';
import { generateMissingNumber } from './missingNumber';
import { generateMixed } from './mixed';

export const getQuestion = (topic, difficulty = 'easy', topicAccuracy = {}) => {
  switch (topic) {
    case 'BODMAS': return generateBodmas(difficulty);
    case 'Fractions & Decimals': return generateFractions();
    case 'Surds & Indices': return generateSurds(difficulty);
    case 'Approximation': return generateApproximation();
    case 'Missing Number': return generateMissingNumber();
    case 'Mixed Mode': return generateMixed(topicAccuracy);
    default: return generateBodmas(difficulty);
  }
};
