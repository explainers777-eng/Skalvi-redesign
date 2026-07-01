import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const ADMIN_EMAIL = "admin@skalvi.com";
const ADMIN_PASSWORD = "SKALVI123SKALVI1234";
const ADMIN_NAME = "Skalvi Admin";
const ADMIN_ROLE = "SUPER_ADMIN";

const isProduction = process.env.NODE_ENV === "production";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8
  },
  pages: {
    signIn: "/secure-admin"
  },
  providers: [
    CredentialsProvider({
      name: "Admin credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        if (
          credentials.email.toLowerCase() === ADMIN_EMAIL &&
          credentials.password === ADMIN_PASSWORD
        ) {
          return { id: "admin-1", email: ADMIN_EMAIL, name: ADMIN_NAME, role: ADMIN_ROLE };
        }
        return null;
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  cookies: {
    sessionToken: {
      name: isProduction ? "__Host-skalvi-session" : "skalvi-session",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: isProduction
      }
    }
  }
};

export function canManage(role?: string | null) {
  return role === "SUPER_ADMIN" || role === "ADMIN" || role === "EDITOR";
}
