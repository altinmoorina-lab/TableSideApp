import { withAuth } from 'next-auth/middleware';
import { authSecret } from '@/lib/auth-secret';

export default withAuth({
  secret: authSecret,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized: ({ req, token }) => {
      if (!token) return false;
      if (req.nextUrl.pathname.startsWith('/admin')) {
        return token.role === 'admin';
      }
      return true;
    },
  },
});

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/admin/:path*'],
};
