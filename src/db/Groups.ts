import { Schema, Types, type InferSchemaType } from 'mongoose';
import getModel from './getModel';

/** 分组 */
const groupSchema = new Schema(
  {
    /** 名称 */
    name: { type: String, required: true },
    /** 子分组 */
    subGroups: { type: [Types.ObjectId], ref: 'Group' },
    /** 问题 */
    questions: { type: [Types.ObjectId], ref: 'Question' },
  },
  { timestamps: true },
);

/** 分组 */
export type Group = InferSchemaType<typeof groupSchema>;
/** 分组 */
export const Groups = getModel('Group', groupSchema);
