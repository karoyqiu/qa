import { useLocalStorage } from 'usehooks-ts';
import type { Exam } from './schemas/exam';

export type ExamOnly = Pick<Exam, 'title' | 'questions'>;

const useExam = () => {
  const [exam, setExam, clearExam] = useLocalStorage<ExamOnly | null>('exam', null, {
    initializeWithValue: false,
  });

  return { exam, setExam, clearExam };
};

export default useExam;
