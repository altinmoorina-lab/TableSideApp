import bcrypt from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import { authSecret } from '@/lib/auth-secret';
import { getLocalUsers } from '@/lib/local-users';

const providers: NextAuthOptions['providers'] = [
  CredentialsProvider({
    name: 'Email and Password',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      const email = credentials?.email?.toLowerCase() ?? '';
      const password = credentials?.password ?? '';
      let user = getLocalUsers().find((item) => item.email === email);

      if (!user && process.env.MONGODB_URI) {
        const { connectToDatabase } = await import('@/lib/mongodb');
        const { default: UserModel } = await import('@/models/User');
        await connectToDatabase();
        const dbUser = (await UserModel.findOne({ email }).lean()) as
          | {
              _id: unknown;
              name: string;
              email: string;
              passwordHash?: string;
              role: 'user' | 'admin';
            }
          | null;
        if (dbUser) {
          user = {
            id: String(dbUser._id),
            name: dbUser.name,
            email: dbUser.email,
            passwordHash: dbUser.passwordHash,
            role: dbUser.role,
          };
        }
      }

      if (!user) return null;

      const validPassword =
        password === user.password || Boolean(user.passwordHash && (await bcrypt.compare(password, user.passwordHash)));

      if (!validPassword) return null;

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    },
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  );
}

if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
  providers.push(
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  );
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || 'user';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role || 'user';
      }
      return session;
    },
  },
  secret: authSecret,
};
