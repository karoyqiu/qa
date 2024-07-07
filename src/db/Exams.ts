import { Schema, type InferSchemaType } from 'mongoose';
import { questionSchema } from './Books';
import getModel from './getModel';

/** 测试 */
const examSchema = new Schema(
  {
    /** 问题书标题 */
    title: { type: String, required: true },
    /** 问题 */
    questions: { type: [questionSchema], required: true },
    /** 每题得分 */
    scores: { type: [Number], min: 0 },
    /** 做题时间，毫秒 */
    duration: Number,
  },
  {
    timestamps: true,
    // virtuals: {
    //   /** 总分 */
    //   score: {
    //     get() {
    //       const total = sum(this.scores);
    //       return (total * 100) / this.questions.length;
    //     },
    //   },
    // },
  },
);

/** 测试 */
export type Exam = InferSchemaType<typeof examSchema>;
/** 测试 */
export const Exams = getModel('Exam', examSchema);
