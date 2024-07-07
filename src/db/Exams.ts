import { Schema, type InferSchemaType } from 'mongoose';
import { questionSchema } from './Books';
import getModel from './getModel';

/** 答题错误 */
const wrongSchema = new Schema(
  {
    /** 问题索引 */
    i: { type: Number, min: 0, required: true, immutable: true },
    /** 错误答案 */
    a: { type: String, required: true, immutable: true },
  },
  { _id: false },
);

/** 测试 */
const examSchema = new Schema(
  {
    /** 问题书标题 */
    title: { type: String, required: true, immutable: true },
    /** 问题 */
    questions: { type: [questionSchema], required: true, immutable: true },
    /** 答题错误 */
    wrongs: { type: [wrongSchema], required: true, immutable: true },
    /** 做题时间，毫秒 */
    duration: { type: Number, required: true, immutable: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

/** 测试 */
export type Exam = InferSchemaType<typeof examSchema>;
/** 测试 */
export const Exams = getModel('Exam', examSchema);
