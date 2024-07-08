'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { auth } from '@/auth';
import { Books } from '@/db/Books';
import connect from '@/db/connect';
import { flatBookSchema, type FlatBook } from '../schemas/book';

const withoutIdSchema = flatBookSchema.omit({ _id: true });
const withIdSchema = withoutIdSchema.extend({ _id: z.string().min(1) });

export const createBook = async (flatBook: Omit<FlatBook, '_id'>) => {
  const session = await auth();

  if (!session?.user?.id) {
    return;
  }

  const valid = withoutIdSchema.safeParse(flatBook);

  if (!valid.success) {
    console.error(valid.error);
    return;
  }

  await connect();
  await Books.create({
    ...valid.data,
    user: session.user.id,
  });

  revalidatePath('/book');
  redirect('/book');
};

export const saveBook = async (flatBook: FlatBook) => {
  const session = await auth();

  if (!session?.user?.id) {
    return;
  }

  const valid = withIdSchema.safeParse(flatBook);

  if (!valid.success) {
    console.error(valid.error);
    return;
  }

  const { _id, ...rest } = valid.data;
  const { modifiedCount } = await Books.updateOne({ _id, user: session.user.id }, { $set: rest });

  if (modifiedCount === 1) {
    revalidatePath(`/book/${_id}`);
  }
};
