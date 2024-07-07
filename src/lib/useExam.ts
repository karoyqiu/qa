import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';
import type { Exam } from '../db/Exams';

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
