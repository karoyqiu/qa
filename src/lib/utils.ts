import { cache } from 'react';

import { Books } from '@/db/Books';
import connect from '@/db/connect';
import type { FlatBook } from './schemas/book';

export const getBooks = cache(async () => {
  await connect();
  return Books.find().lean();
});

export const getBook = cache(async (id: string) => {
  await connect();
  const book = await Books.findById(id)
    .populate<FlatBook>({
      path: 'groups',
      populate: 'questions',
    })
    .lean();
  return book;
});
