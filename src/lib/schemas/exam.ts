import { z } from 'zod';
import { questionSchema } from './book';

const wrongSchema = z.object({
  i: z.number().int().min(0),
  a: z.string(),
});

export const examSchema = z.object({
  title: z.string().trim().min(1),
  questions: questionSchema.array().min(1),
  wrongs: wrongSchema.array(),
  duration: z.number().min(0),
});

export type Wrong = z.infer<typeof wrongSchema>;
export type Exam = z.infer<typeof examSchema>;
