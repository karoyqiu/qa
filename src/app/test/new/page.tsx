import type { Metadata } from 'next';
import NewTestForm from '../../../components/NewTestForm';
import { getBooks } from '../../../lib/utils';

export const metadata: Metadata = {
  title: 'Create new test',
};

export default async function Page() {
  const books = await getBooks();

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-2">
      <h1>Create new test</h1>
      <NewTestForm books={books.map((book) => ({ ...book, _id: book._id.toString() }))} />
    </div>
  );
}
