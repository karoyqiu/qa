import type { Metadata } from 'next';

import NewExamForm from '@/components/NewExamForm';
import { getBooks } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'New exam',
};

export default async function Page() {
  const books = await getBooks();

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-2">
      <h1>New exam</h1>
      <NewExamForm books={books.map((book) => ({ ...book, _id: book._id.toString() }))} />
    </div>
  );
}
