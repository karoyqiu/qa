'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { flatBookSchema, type FlatBook } from '../../../lib/schemas/book';

type BookFormProps = {
  onSubmit: (book: FlatBook) => void | Promise<void>;
};

export default function BookForm(props: BookFormProps) {
  const { onSubmit } = props;
  const form = useForm<FlatBook>({
    resolver: zodResolver(flatBookSchema),
  });

  return <form onSubmit={form.handleSubmit(onSubmit)}></form>;
}
