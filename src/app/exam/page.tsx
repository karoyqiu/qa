import type { Metadata } from 'next';
import Link from 'next/link';

import cn from '@/components/cn';
import type { Exam } from '@/db/Exams';
import { getExams } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Exams',
};

export default async function Page() {
  const exams = await getExams();

  const linkColor = (exam: Exam) => {
    const score = exam.wrongs.length / exam.questions.length;

    if (score > 0.1) {
      return 'btn-error';
    }

    if (score > 0) {
      return 'btn-warning';
    }

    return 'btn-success';
  };

  return (
    <div className="flex flex-col gap-2 p-2">
      {exams.map((exam) => (
        <Link
          key={exam._id.toString()}
          className={cn('btn', linkColor(exam))}
          href={`/exam/${exam._id}`}
        >
          {`${exam.title} (${exam.questions.length - exam.wrongs.length}/${exam.questions.length}, ${Math.round(exam.duration / 1000)}s)`}
        </Link>
      ))}
    </div>
  );
}
