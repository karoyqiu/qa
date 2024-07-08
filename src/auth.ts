import { MongoDBAdapter } from '@auth/mongodb-adapter';
import NextAuth from 'next-auth';
import Auth0 from 'next-auth/providers/auth0';
import Resend from 'next-auth/providers/resend';
import connect from './db/connect';

const getClientPromise = async () => {
  const conn = await connect();
  return conn.connection.getClient();
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(getClientPromise()),
  providers: [
    Resend({ from: 'QA <no-reply@qa.hlwcr.cn>' }),
    Auth0({ issuer: 'https://ubesthelp.auth0.com' }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
});
