'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { Books } from '@/db/Books';
import connect from '@/db/connect';
import { flatBookSchema, type FlatBook } from '../schemas/book';

const withoutIdSchema = flatBookSchema.omit({ _id: true });
const withIdSchema = withoutIdSchema.extend({ _id: z.string().min(1) });

export const createBook = async (flatBook: Omit<FlatBook, '_id'>) => {
  const valid = withoutIdSchema.safeParse(flatBook);

  if (!valid.success) {
    console.error(valid.error);
    return;
  }

  await connect();
  await Books.create(valid.data);

  revalidatePath('/book');
  redirect('/book');
};

export const saveBook = async (flatBook: FlatBook) => {
  const valid = withIdSchema.safeParse(flatBook);

  if (!valid.success) {
    console.error(valid.error);
    return;
  }

  const { _id, ...rest } = valid.data;
  await Books.updateOne({ _id }, { $set: rest });
  revalidatePath(`/book/${_id}`);
};
