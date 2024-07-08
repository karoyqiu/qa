import { PlusIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

import { auth, signIn, signOut } from '@/auth';
import Input from '@/components/Input';
import SignOutButton from '../components/SignOutButton';

export default async function Home() {
  const session = await auth();

  const bye = async () => {
    'use server';
    await signOut();
  };

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
      {session ? (
        <div className="container mx-auto flex flex-col gap-4 p-4">
          <div>{`Hello, ${session.user?.name ?? session.user?.email ?? 'John Doe'}!`}</div>
          <Link className="btn btn-primary" href="/test/new">
            New test
          </Link>
          <Link className="btn btn-secondary" href="/book/new">
            New book
          </Link>
          <SignOutButton />
        </div>
      ) : (
        <form
          className="container mx-auto flex flex-col gap-4 p-4"
          action={async (formData) => {
            'use server';
            await signIn('resend', formData);
          }}
        >
          <Input name="email" type="email" autoComplete="email" autoFocus required />
          <button className="btn btn-primary">Sign in with email</button>
        </form>
      )}
    </div>
  );
}
