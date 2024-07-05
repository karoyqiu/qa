import { Schema, Types, type InferSchemaType } from 'mongoose';
import { questionSchema } from './Books';
import getModel from './getModel';

/** 测试 */
const testSchema = new Schema(
  {
    /** 问题书 */
    book: { type: Types.ObjectId, ref: 'Book', required: true, index: true },
    /** 问题 */
    questions: { type: [questionSchema], required: true },
    // /** 每题得分 */
    // scores: { type: [Number], min: 0 },
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
export type Test = InferSchemaType<typeof testSchema>;
/** 测试 */
export const Tests = getModel('Test', testSchema);
