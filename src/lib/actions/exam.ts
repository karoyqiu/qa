'use server';
import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import connect from '@/db/connect';
import { Exams } from '@/db/Exams';
import { examSchema, type Exam } from '../schemas/exam';

export const saveExam = async (exam: Exam) => {
  const session = await auth();

  if (!session?.user?.id) {
    return;
  }

  const valid = examSchema.safeParse(exam);

  if (!valid.success) {
    console.error(valid.error);
    return;
  }

  await connect();
  const doc = await Exams.create({ ...valid.data, user: session.user.id });
  revalidatePath('/exam');
  revalidatePath(`/exam/${doc._id}`);
};
