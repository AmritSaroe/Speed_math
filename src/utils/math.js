import { evaluate } from 'mathjs';

export const safeEvaluate = (expression) => evaluate(expression);

export const normalizeFraction = (value) => {
  if (typeof value === 'number') return Number(value.toFixed(2));
  return value;
};

export const parseAnswer = (input) => {
  const trimmed = String(input).trim();
  if (/^\d+\/\d+$/.test(trimmed)) {
    const [a, b] = trimmed.split('/').map(Number);
    return a / b;
  }
  const num = Number(trimmed);
  return Number.isFinite(num) ? num : null;
};

export const isCorrectAnswer = (expected, actualInput, tolerance = 0) => {
  const actual = parseAnswer(actualInput);
  if (actual === null) return false;
  const exp = typeof expected === 'string' && expected.includes('/') ? parseAnswer(expected) : Number(expected);
  if (!Number.isFinite(exp)) return false;
  if (tolerance > 0) return Math.abs(actual - exp) <= Math.abs(exp) * tolerance;
  return Math.abs(actual - exp) < 1e-9;
};
