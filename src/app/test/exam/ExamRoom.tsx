'use client';
import { useEffect, useId, useRef, useState } from 'react';

import cn from '@/components/cn';
import { useReadExam } from '@/lib/useExam';
import { saveExam } from '../../../lib/actions/exam';
import type { Wrong } from '../../../lib/schemas/exam';

export default function ExamRoom() {
  const exam = useReadExam();
  const [scores, setScores] = useState<number[]>([]);
  const now = useRef(Date.now());
  const id = useId();

  useEffect(() => {
    if (exam) {
      if (scores.length === 0) {
        for (let i = 0; i < exam.questions.length; i++) {
          const elem = document.getElementById(`${id}${i}`);

          if (elem) {
            const input = elem as HTMLInputElement;
            input.value = '';

            if (i === 0) {
              input.scrollIntoView(false);
              input.focus();
            }
          }
        }

        now.current = Date.now();
      } else {
        const wrongs: Wrong[] = [];

        for (let i = 0; i < exam.questions.length; i++) {
          const elem = document.getElementById(`${id}${i}`);

          if (elem) {
            const input = elem as HTMLInputElement;

            if (input.value !== exam.questions[i].a) {
              wrongs.push({
                i,
                a: input.value,
              });
              input.value = `${input.value} -> ${exam.questions[i].a}`;
            }
          }
        }

        saveExam({
          ...exam,
          wrongs,
          duration: Date.now() - now.current,
        });
      }
    }
  }, [exam, scores, id]);

  if (!exam) {
    return <span className="loading loading-dots loading-xs" />;
  }

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

  const check = () =>
    setScores((old) => {
      if (old.length === 0) {
        const ss: number[] = [];

        for (let i = 0; i < exam.questions.length; i++) {
          const elem = document.getElementById(`${id}${i}`);

          if (elem) {
            const input = elem as HTMLInputElement;
            ss.push(input.value === exam.questions[i].a ? 1 : 0);
          }
        }

        return ss;
      }

      return [];
    });

  return (
    <div className="flex flex-col gap-4">
      <h1>{exam.title}</h1>
      <ol className="list-decimal space-y-4 pl-12">
        {exam.questions.map((q, index) => (
          <li key={q.q} className={markerColor(index)}>
            <p className={questionColor(index)}>{q.q}</p>
            <input
              id={`${id}${index}`}
              className={cn('input input-bordered w-full', inputColor(index))}
            />
          </li>
        ))}
      </ol>
      <button className="btn btn-primary" onClick={check}>
        {scores.length === 0 ? 'Submit' : 'Again'}
      </button>
    </div>
  );
}
