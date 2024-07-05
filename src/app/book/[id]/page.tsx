import { redirect } from 'next/navigation';

import BookForm from '@/components/BookForm';
import { saveBook } from '@/lib/actions/book';
import { getBook, getBooks } from '@/lib/utils';

export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((book) => ({ id: book._id.toString() }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const book = await getBook(id);

  if (!book) {
    redirect('/book');
  }

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-2">
      <BookForm flatBook={book} onSubmit={saveBook} />
    </div>
  );
}
