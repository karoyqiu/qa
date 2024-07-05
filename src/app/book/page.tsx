import type { Metadata } from 'next';
import Link from 'next/link';

import { getBooks } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Books',
};

export default async function Page() {
  const books = await getBooks();

  return (
    <div className="flex flex-col gap-2 p-2">
      {books.map((book) => (
        <Link key={book._id.toString()} className="btn" href={`/book/${book._id}`}>
          {book.title}
        </Link>
      ))}
    </div>
  );
}
