import { MongoDBAdapter } from '@auth/mongodb-adapter';
import NextAuth from 'next-auth';
import Resend from 'next-auth/providers/resend';
import connect from './db/connect';

const getClientPromise = async () => {
  const conn = await connect();
  return conn.connection.getClient();
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(getClientPromise()),
  providers: [Resend({ from: 'QA <no-reply@qa.hlwcr.cn>' })],
  session: {
    strategy: 'jwt',
  },
});
