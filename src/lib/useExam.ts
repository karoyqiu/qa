import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';
import type { Exam } from './schemas/exam';

type ExamOnly = Pick<Exam, 'title' | 'questions'>;

export const useExam = () => {
  const [exam, setExam, clearExam] = useLocalStorage<ExamOnly | null>('exam', null, {
    initializeWithValue: false,
  });

  return { exam, setExam, clearExam };
};

export const useReadExam = () => {
  const exam = useReadLocalStorage<ExamOnly>('exam', { initializeWithValue: false });
  return exam;
};
