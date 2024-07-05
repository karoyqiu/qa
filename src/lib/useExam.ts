import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';
import type { Question } from './schemas/book';

export type Exam = {
  title: string;
  questions: Question[];
  scores: number[];
};

export const useExam = () => {
  const [exam, setExam, clearExam] = useLocalStorage<Exam | null>('exam', null, {
    initializeWithValue: false,
  });

  return { exam, setExam, clearExam };
};

export const useReadExam = () => {
  const exam = useReadLocalStorage<Exam>('exam', { initializeWithValue: false });
  return exam;
};
