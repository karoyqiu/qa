import { PlusIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function BookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex max-h-[calc(100vh-4rem)] flex-col">
      <div className="navbar bg-neutral text-neutral-content">
        <h1 className="text-xl">Exams</h1>
        <div className="ml-auto">
          <Link className="btn btn-square btn-ghost" href="/exam/new">
            <PlusIcon />
          </Link>
        </div>
      </div>
      <div className="overflow-y-auto">
        <div className="container mx-auto">{children}</div>
      </div>
    </div>
  );
}
