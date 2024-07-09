'use client';
import { TrashIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { Fragment } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { flatBookSchema, type FlatBook } from '@/lib/schemas/book';
import Input from './Input';
import QuestionsFields from './QuestionsFields';

//const dupQuestions = (from: Question[]) =>

type BookFormProps = {
  flatBook?: FlatBook;
  onSubmit: (flatBook: FlatBook) => unknown | Promise<unknown>;
};

export default function BookForm(props: BookFormProps) {
  const { flatBook, onSubmit } = props;
  const form = useForm<FlatBook>({
    resolver: zodResolver(flatBookSchema),
    defaultValues: flatBook,
  });
  const groupFields = useFieldArray({ control: form.control, name: 'groups' });

  const dup = () => {
    const originalGroups = form.getValues('groups');

    const newGroups = originalGroups.map((group) => ({
      name: group.name,
      questions: group.questions
        .map((question) => [question, { q: question.a, a: question.q }])
        .flat(),
    }));

    form.setValue('groups', newGroups);
  };

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
          <PlusIcon />
          Add group
        </button>
      </div>
      <button className="btn" type="button" onClick={dup}>
        Duplicate & swap
      </button>
      <button className="btn btn-primary" type="submit" disabled={form.formState.isSubmitting}>
        {flatBook?._id ? 'Save' : 'Create'}
      </button>
      {flatBook?._id && (
        <button
          className="btn btn-warning"
          type="button"
          disabled={form.formState.isSubmitting}
          onClick={() => form.reset(flatBook)}
        >
          Reset
        </button>
      )}
    </form>
  );
}
