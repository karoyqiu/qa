import { createBook } from '@/lib/actions/book';
import BookForm from '../../../components/BookForm';

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-2">
      <h1>Create new book</h1>
      <BookForm onSubmit={createBook} />
    </div>
  );
}
