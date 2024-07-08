'use client';
import { useExam, type ExamOnly } from '@/lib/useExam';
import { useRouter } from 'next/navigation';

type AgainButtonProps = {
  exam: ExamOnly;
};

export default function AgainButton(props: AgainButtonProps) {
  const { exam } = props;
  const { setExam } = useExam();
  const router = useRouter();

  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        setExam(exam);
        router.push('/exam/exam');
      }}
    >
      Again
    </button>
  );
}
