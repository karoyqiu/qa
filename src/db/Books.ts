import { Schema, Types, type InferSchemaType } from 'mongoose';
import getModel from './getModel';

/** 问题 */
export const questionSchema = new Schema(
  {
    /** 问题 */
    q: { type: String, required: true },
    /** 答案 */
    a: { type: String, required: true },
  },
  { _id: false },
);

/** 分组 */
const groupSchema = new Schema(
  {
    /** 名称 */
    name: { type: String, required: true },
    /** 问题 */
    questions: { type: [questionSchema], required: true },
  },
  { _id: false },
);

/** 问题书 */
const bookSchema = new Schema(
  {
    /** 用户 */
    user: { type: Types.ObjectId, ref: 'User', required: true, index: true },
    /** 标题 */
    title: { type: String, required: true },
    /** 作者 */
    author: String,
    /** 描述 */
    description: String,
    /** 分组 */
    groups: { type: [groupSchema], required: true },
  },
  { timestamps: true },
);

/** 问题书 */
export type Book = InferSchemaType<typeof bookSchema>;
/** 问题书 */
export const Books = getModel('Book', bookSchema);
