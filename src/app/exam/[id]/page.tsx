import { list } from 'radash';

import cn from '@/components/cn';
import { Exams } from '@/db/Exams';
import { getExam } from '@/lib/utils';

type PageParams = { params: { id: string } };

export async function generateStaticParams() {
  const params: { id: string }[] = [];
  const cursor = Exams.find({}, '_id').cursor();

  for await (const book of cursor) {
    params.push({ id: book._id.toString() });
  }

  return params;
}

export async function generateMetadata({ params }: PageParams) {
  const { id } = params;
  const exam = await getExam(id);

  return {
    title: exam?.title,
  };
}

export default async function Page({ params }: PageParams) {
  const { id } = params;
  const exam = await getExam(id);

  if (!exam) {
    return <span className="loading loading-dots loading-xs" />;
  }

  const scores = list(0, exam.questions.length - 1, 1);

  for (const wrong of exam.wrongs) {
    scores[wrong.i] = 0;
  }

  const answer = (index: number) => {
    const wrong = exam.wrongs.find((w) => w.i === index);

    if (wrong) {
      return `${wrong.a} -> ${exam.questions[index].a}`;
    }

    return exam.questions[index].a;
  };

  const markerColor = (index: number) => {
    switch (scores[index]) {
      case 1:
        return 'marker:text-success';
      case 0:
        return 'marker:text-error';
      default:
        return '';
    }
  };

  const questionColor = (index: number) => {
    switch (scores[index]) {
      case 1:
        return 'text-success';
      case 0:
        return 'text-error';
      default:
        return '';
    }
  };

  const inputColor = (index: number) => {
    switch (scores[index]) {
      case 1:
        return 'input-success';
      case 0:
        return 'input-error';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col gap-4 overflow-y-auto p-2">
      <h1>{exam.title}</h1>
      <ol className="list-decimal space-y-4 pl-12">
        {exam.questions.map((q, index) => (
          <li key={q.q} className={markerColor(index)}>
            <p className={questionColor(index)}>{q.q}</p>
            <input
              id={`${id}${index}`}
              className={cn('input input-bordered w-full', inputColor(index))}
              value={answer(index)}
              readOnly
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
