import { createBook } from '@/lib/actions/book';
import BookForm from './BookForm';

export default function Page() {
  return (
    <div>
      <BookForm onSubmit={createBook} />
    </div>
  );
}
