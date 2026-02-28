import { useMemo, useState } from 'react';
import { getQuestion } from '../generators';
import { isCorrectAnswer } from '../utils/math';

export const useSession = ({ topic, total, difficulty, topicAccuracy }) => {
  const [index, setIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [records, setRecords] = useState([]);
  const question = useMemo(() => getQuestion(topic, difficulty, topicAccuracy), [topic, difficulty, index]);

  const submit = (input, timeTaken) => {
    const correct = isCorrectAnswer(question.answer, input, question.tolerance || 0);
    const nextRecord = { correct, time: timeTaken, question: question.question, answer: question.answer, pattern: question.pattern, difficulty };
    setRecords((r) => [...r, nextRecord]);
    setStreak((s) => (correct ? s + 1 : 0));
    setIndex((i) => i + 1);
    return { correct, done: index + 1 >= total, correctAnswer: question.answer, record: nextRecord };
  };

  return { index, question, streak, records, submit };
};
