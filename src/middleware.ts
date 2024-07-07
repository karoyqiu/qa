import NextAuth from 'next-auth';

const { auth } = NextAuth({
  providers: [],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
});

export const middleware = auth;

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
