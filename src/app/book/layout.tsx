import { PlusIcon } from '@heroicons/react/24/solid';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Books',
};

export default function BookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <div className="navbar bg-neutral text-neutral-content">
        <h1 className="navbar-start text-xl">Books</h1>
        <div className="navbar-end">
          <Link className="btn btn-square btn-ghost" href="/book/new">
            <PlusIcon className="size-6" />
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
