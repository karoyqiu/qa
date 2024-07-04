import connect from '@/db/connect';
import Link from 'next/link';
import { cache } from 'react';
import { Books } from '../../db/Books';

const getBooks = cache(async () => {
  await connect();
  return Books.find().lean();
});

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
