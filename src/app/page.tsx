import { PlusIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="navbar bg-neutral text-neutral-content">
        <h1 className="navbar-start text-xl">Questions & Answers!</h1>
        <div className="navbar-end">
          <Link className="btn btn-square btn-ghost" href="/test/new">
            <PlusIcon />
          </Link>
        </div>
      </div>
      <div className="p-4"></div>
    </div>
  );
}
