import { cache } from 'react';

import { auth } from '@/auth';
import { Books } from '@/db/Books';
import connect from '@/db/connect';

export const getBooks = cache(async () => {
  const [session] = await Promise.all([auth(), connect()]);

  if (!session?.user?.id) {
    console.warn('Not sign in?', session);
    return [];
  }

  console.info(`User: ${session.user.id}`);
  return Books.find({ user: session.user.id }).lean();
});

export const getBook = cache(async (id: string) => {
  const [session] = await Promise.all([auth(), connect()]);

  if (!session?.user?.id) {
    return null;
  }

  const book = await Books.findOne({ _id: id, user: session.user.id }).lean();

  if (book) {
    return {
      ...book,
      _id: id,
    };
  }

  return null;
});
