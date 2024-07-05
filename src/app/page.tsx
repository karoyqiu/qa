import { PlusIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="navbar bg-neutral text-neutral-content">
        <h1 className="text-xl">Questions & Answers!</h1>
        <div className="ml-auto">
          <Link className="btn btn-square btn-ghost" href="/test/new">
            <PlusIcon />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <Link className="btn btn-primary" href="/test/new">
          New test
        </Link>
        <Link className="btn btn-secondary" href="/book/new">
          New book
        </Link>
      </div>
    </div>
  );
}
