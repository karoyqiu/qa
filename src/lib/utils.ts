import { cache } from 'react';

import { Books } from '@/db/Books';
import connect from '@/db/connect';

export const getBooks = cache(async () => {
  await connect();
  return Books.find().lean();
});

export const getBook = cache(async (id: string) => {
  await connect();
  const book = await Books.findById(id).lean();

  if (book) {
    return {
      ...book,
      _id: id,
    };
  }

  return null;
});
