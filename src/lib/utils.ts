import { cache } from 'react';

import { auth } from '@/auth';
import { Books } from '@/db/Books';
import connect from '@/db/connect';
import { Exams } from '@/db/Exams';

export const getBooks = cache(async () => {
  const [session] = await Promise.all([auth(), connect()]);

  if (!session?.user?.id) {
    return [];
  }

  return Books.find({ user: session.user.id }, { user: 0 }, { sort: { updatedAt: -1 } }).lean();
});

export const getBook = cache(async (id: string) => {
  const [session] = await Promise.all([auth(), connect()]);

  if (!session?.user?.id) {
    return null;
  }

  const book = await Books.findOne({ _id: id, user: session.user.id }, { user: 0 }).lean();

  if (book) {
    return {
      ...book,
      _id: id,
    };
  }

  return null;
});

export const getExams = cache(async () => {
  const [session] = await Promise.all([auth(), connect()]);

  if (!session?.user?.id) {
    console.warn('Not sign in?', session);
    return [];
  }

  return Exams.find({ user: session.user.id }, { user: 0 }, { sort: { createdAt: -1 } }).lean();
});

export const getExam = cache(async (id: string) => {
  const [session] = await Promise.all([auth(), connect()]);

  if (!session?.user?.id) {
    return null;
  }

  const exam = await Exams.findOne({ _id: id, user: session.user.id }, { user: 0 }).lean();

  if (exam) {
    return {
      ...exam,
      _id: id,
    };
  }

  return null;
});
