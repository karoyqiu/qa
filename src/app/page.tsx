import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="navbar bg-neutral text-neutral-content">
        <h1>Questions & Answers!</h1>
      </div>
      <div className="p-4">
        <Link className="btn" href="book">
          Books
        </Link>
      </div>
    </div>
  );
}
