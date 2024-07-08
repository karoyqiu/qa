'use client';

import { bye } from '@/lib/actions/auth';

export default function SignOutButton() {
  return (
    <button className="btn btn-error" onClick={() => bye()}>
      Sign out
    </button>
  );
}
