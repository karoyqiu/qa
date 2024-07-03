import { Schema, Types, type InferSchemaType } from 'mongoose';
import getModel from './getModel';

/** 问题书 */
const bookSchema = new Schema({
  /** 标题 */
  title: { type: String, required: true },
  /** 作者 */
  author: String,
  /** 描述 */
  description: String,
  /** 分组 */
  groups: { type: [Types.ObjectId], ref: 'Group' },
  /** 问题 */
  questions: { type: [Types.ObjectId], ref: 'Question' },
});

/** 问题书 */
export type Book = InferSchemaType<typeof bookSchema>;
/** 问题书 */
export const Books = getModel('Book', bookSchema);
