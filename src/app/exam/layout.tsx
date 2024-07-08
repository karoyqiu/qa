import { PlusIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

import TopNavBar from '@/components/TopNavBar';

export default function BookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex max-h-screen flex-col md:max-h-[calc(100vh-4rem)]">
      <div className="navbar gap-4 bg-neutral text-neutral-content">
        <h1 className="text-xl md:navbar-start">Exams</h1>
        <TopNavBar currentHref="/exam" />
        <div className="ml-auto md:navbar-end">
          <div className="md:tooltip md:tooltip-left md:tooltip-accent" data-tip="New exam">
            <Link className="btn btn-square btn-ghost" href="/exam/new">
              <PlusIcon />
            </Link>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto">
        <div className="container mx-auto">{children}</div>
      </div>
    </div>
  );
}
