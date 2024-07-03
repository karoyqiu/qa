import {
  type HydratedDocument,
  type InferSchemaType,
  type Model,
  type ObtainSchemaGeneric,
  type Schema,
  model,
  models,
} from 'mongoose';

/**
 * 模型类型
 */
export type ModelType<TSchema> = Model<
  InferSchemaType<TSchema>,
  ObtainSchemaGeneric<TSchema, 'TQueryHelpers'>,
  ObtainSchemaGeneric<TSchema, 'TInstanceMethods'>,
  ObtainSchemaGeneric<TSchema, 'TVirtuals'>,
  HydratedDocument<
    InferSchemaType<TSchema>,
    ObtainSchemaGeneric<TSchema, 'TVirtuals'> & ObtainSchemaGeneric<TSchema, 'TInstanceMethods'>,
    ObtainSchemaGeneric<TSchema, 'TQueryHelpers'>
  >,
  TSchema
> &
  ObtainSchemaGeneric<TSchema, 'TStaticMethods'>;

/**
 * 获取模型
 */
export default function getModel<TSchema extends Schema>(name: string, schema: TSchema) {
  return (models[name] ?? model(name, schema)) as ModelType<TSchema>;
}
