import { redirect } from 'next/navigation';

import BookForm from '@/components/BookForm';
import { saveBook } from '@/lib/actions/book';
import { getBook } from '@/lib/utils';
import { Books } from '../../../db/Books';

type PageParams = { params: { id: string } };

export async function generateStaticParams() {
  const params: { id: string }[] = [];
  const cursor = Books.find({}, '_id').cursor();

  for await (const book of cursor) {
    params.push({ id: book._id.toString() });
  }

  return params;
}

export async function generateMetadata({ params }: PageParams) {
  const { id } = params;
  const book = await getBook(id);

  return {
    title: book?.title,
  };
}

export default async function Page({ params }: PageParams) {
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
