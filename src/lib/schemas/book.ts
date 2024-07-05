import { z } from 'zod';

const questionSchema = z.object({
  q: z.string().trim().min(1),
  a: z.string().trim().min(1),
});

const groupSchema = z.object({
  name: z.string().trim().min(1),
  questions: questionSchema.array().min(1),
});

export const flatBookSchema = z.object({
  _id: z.string().optional(),
  title: z.string().trim().min(1),
  author: z.string().trim().nullish(),
  description: z.string().trim().nullish(),
  groups: groupSchema.array().min(1),
});

export type FlatBook = z.infer<typeof flatBookSchema>;
