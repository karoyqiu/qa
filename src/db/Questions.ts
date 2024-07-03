import { Schema, type InferSchemaType } from 'mongoose';
import getModel from './getModel';

/** 问题 */
const questionSchema = new Schema(
  {
    /** 问题 */
    q: { type: String, required: true },
    /** 答案 */
    a: { type: String, required: true },
  },
  { timestamps: true },
);

/** 问题 */
export type Question = InferSchemaType<typeof questionSchema>;
/** 问题 */
export const Questions = getModel('Question', questionSchema);
