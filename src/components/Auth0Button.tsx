'use client';

import { auth0 } from '@/lib/actions/auth';

export default function Auth0Button() {
  return (
    <button className="btn btn-primary" type="button" onClick={() => auth0()}>
      Sign in with Auth0
    </button>
  );
}
