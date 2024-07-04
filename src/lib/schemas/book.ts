import { z } from 'zod';

const questionSchema = z.object({
  q: z.string().min(1),
  a: z.string().min(1),
});

const groupSchema = z.object({
  name: z.string().min(1),
  questions: questionSchema.array().min(1),
});

export const flatBookSchema = z.object({
  title: z.string().min(1),
  author: z.string(),
  description: z.string(),
  groups: groupSchema.array().min(1),
});

export type FlatBook = z.infer<typeof flatBookSchema>;
