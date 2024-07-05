import type { Metadata } from 'next';

import BookForm from '@/components/BookForm';
import { createBook } from '@/lib/actions/book';

export const metadata: Metadata = {
  title: 'Create new book',
};

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-2">
      <h1>Create new book</h1>
      <BookForm onSubmit={createBook} />
    </div>
  );
}
