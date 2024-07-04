'use client';
import { TrashIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { Fragment } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import Input from '@/components/Input';
import { flatBookSchema, type FlatBook } from '@/lib/schemas/book';
import QuestionsFields from './QuestionsFields';

type BookFormProps = {
  onSubmit: (flatBook: FlatBook) => unknown | Promise<unknown>;
};

export default function BookForm(props: BookFormProps) {
  const { onSubmit } = props;
  const form = useForm<FlatBook>({
    resolver: zodResolver(flatBookSchema),
  });
  const groupFields = useFieldArray({ control: form.control, name: 'groups' });

  return (
    <form className="flex flex-col gap-2" onSubmit={form.handleSubmit((data) => onSubmit(data))}>
      <Input {...form.register('title')} required autoFocus />
      <Input {...form.register('author')} autoComplete="name" />
      <Input {...form.register('description')} />
      <div className="form-control w-full">
        <div className="label">
          <span className={'required label-text'}>Groups</span>
        </div>
        {groupFields.fields.map((field, index) => (
          <Fragment key={field.id}>
            <div className="flex items-end gap-2">
              <Input
                {...form.register(`groups.${index}.name`)}
                label={`Group ${index + 1} name`}
                required
              />
              <button
                className="btn btn-square btn-error"
                onClick={() => groupFields.remove(index)}
              >
                <TrashIcon />
              </button>
            </div>
            <QuestionsFields groupIndex={index} control={form.control} register={form.register} />
          </Fragment>
        ))}
        <button
          className="btn mt-2"
          type="button"
          onClick={() =>
            groupFields.append({
              name: '',
              questions: [],
            })
          }
        >
          <PlusIcon className="size-6" />
          Add group
        </button>
      </div>
      <button className="btn btn-primary" type="submit" disabled={form.formState.isSubmitting}>
        Create
      </button>
    </form>
  );
}
