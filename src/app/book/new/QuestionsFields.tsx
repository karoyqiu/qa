'use client';
import { TrashIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Fragment } from 'react';
import { useFieldArray, type Control, type UseFormRegister } from 'react-hook-form';

import Input from '@/components/Input';
import type { FlatBook } from '@/lib/schemas/book';

type QuestionsFieldsProps = {
  groupIndex: number;
  control: Control<FlatBook>;
  register: UseFormRegister<FlatBook>;
};

export default function QuestionsFields(props: QuestionsFieldsProps) {
  const { groupIndex, control, register } = props;
  const fields = useFieldArray({ control, name: `groups.${groupIndex}.questions` });

  return (
    <div className="form-control flex">
      <div className="label">
        <span className={'required label-text'}>{`Group ${groupIndex + 1} questions`}</span>
      </div>
      {fields.fields.map((field, index) => (
        <Fragment key={field.id}>
          <div className="flex items-end gap-2">
            <Input
              {...register(`groups.${groupIndex}.questions.${index}.q`)}
              label={`Group ${groupIndex + 1} question ${index + 1}`}
              required
            />
            <button className="btn btn-square btn-error" onClick={() => fields.remove(index)}>
              <TrashIcon />
            </button>
          </div>
          <Input
            key={field.id}
            {...register(`groups.${groupIndex}.questions.${index}.a`)}
            label={`Group ${groupIndex + 1} answer ${index + 1}`}
            required
          />
        </Fragment>
      ))}
      <button className="btn mt-2" type="button" onClick={() => fields.append({ q: '', a: '' })}>
        <PlusIcon className="size-6" />
        Add question
      </button>
    </div>
  );
}
