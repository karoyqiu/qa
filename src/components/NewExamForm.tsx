'use client';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { list, shuffle } from 'radash';
import { useEffect, useState } from 'react';

import type { Book } from '@/db/Books';
import type { Question } from '@/lib/schemas/book';
import useExam from '@/lib/useExam';
import Checkbox from './Checkbox';
import Label from './Label';

type WithId<T> = T & {
  _id: string;
};

type NewExamFormProps = {
  books: WithId<Book>[];
};

export default function NewExamForm(props: NewExamFormProps) {
  const { books } = props;
  const [bookId, setBookId] = useState(books[0]._id);
  const [groupIndexes, setGroupIndexes] = useState<number[]>([]);
  const { setExam } = useExam();
  const router = useRouter();
  const book = books.find((b) => b._id === bookId);
  const total = book
    ? book.groups.reduce(
        (prev, group, index) =>
          groupIndexes.includes(index) ? prev + group.questions.length : prev,
        0,
      )
    : 0;

  const generateExam = () => {
    if (!book) {
      return;
    }

    const questions: Question[] = [];

    for (let i = 0; i < book.groups.length; i++) {
      if (groupIndexes.includes(i)) {
        questions.push(...book.groups[i].questions);
      }
    }

    setExam({
      title: book.title,
      questions: shuffle(questions),
    });

    router.push('/exam/exam');
  };

  useEffect(() => {
    const b = books.find((b) => b._id === bookId);

    if (b) {
      setGroupIndexes(list(b.groups.length - 1));
    }
  }, [books, bookId]);

  return (
    <div className="flex flex-col gap-2">
      <Label label="Book">
        <select
          className="select select-bordered w-full"
          value={bookId}
          onChange={(event) => setBookId(event.target.value)}
        >
          {books.map((book) => (
            <option key={book._id.toString()} value={book._id.toString()}>
              {book.title}
            </option>
          ))}
        </select>
      </Label>
      <Label label={`Groups (selected questions: ${total})`}>
        {book &&
          book.groups.map((group, index) => (
            <Checkbox
              key={group.name}
              label={group.name}
              checked={groupIndexes.includes(index)}
              onChange={() =>
                setGroupIndexes((old) => {
                  const idx = old.indexOf(index);

                  if (idx === -1) {
                    return [...old, index];
                  }

                  return old.toSpliced(idx, 1);
                })
              }
            />
          ))}
      </Label>
      <button className="btn btn-primary" onClick={generateExam}>
        <RocketLaunchIcon />
        Go!
      </button>
    </div>
  );
}
