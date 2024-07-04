'use server';
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { Books } from '@/db/Books';
import connect from '@/db/connect';
import { Groups } from '@/db/Groups';
import { Questions } from '@/db/Questions';
import type { FlatBook } from '../schemas/book';

export const createBook = async (flatBook: FlatBook) => {
  await connect();

  const session = await mongoose.startSession();
  session.withTransaction(async () => {
    const book = new Books({
      title: flatBook.title,
      author: flatBook.author,
      description: flatBook.description,
    });

    for (const group of flatBook.groups) {
      const questions = await Questions.create(group.questions, { session });
      const g = new Groups({ name: group.name, questions: questions.map((q) => q._id) });
      await g.save({ session });
      book.groups.push(g._id);
    }

    await book.save({ session });
  });

  revalidatePath('/book');
  redirect('/book');
};
