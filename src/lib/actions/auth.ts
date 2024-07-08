'use server';

import { signIn, signOut } from '@/auth';

export const auth0 = () => signIn('auth0');

export const bye = signOut;
