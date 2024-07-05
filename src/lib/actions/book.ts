'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { Books } from '@/db/Books';
import connect from '@/db/connect';
import type { FlatBook } from '../schemas/book';

export const createBook = async (flatBook: FlatBook) => {
  await connect();
  await Books.create(flatBook);

  revalidatePath('/book');
  redirect('/book');
};

export const saveBook = async (flatBook: FlatBook) => {
  const { _id, ...rest } = flatBook;

  if (!_id) {
    return;
  }

  await Books.updateOne({ _id }, { $set: rest });
  revalidatePath(`/book/${_id}`);
};
