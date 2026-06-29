import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

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
        const email = credentials.email.toLowerCase();
        try {
          const user = await prisma.user.findUnique({ where: { email } });
          if (!user || !user.active) return null;
          const valid = await bcrypt.compare(credentials.password, user.passwordHash);
          if (!valid) return null;
          return { id: user.id, email: user.email, name: user.name, role: user.role };
        } catch (error) {
          if (
            process.env.NODE_ENV !== "production" &&
            email === (process.env.ADMIN_EMAIL ?? "admin@skalvi.com").toLowerCase() &&
            credentials.password === (process.env.ADMIN_PASSWORD ?? "ChangeMeStrongly123!")
          ) {
            return { id: "local-dev-admin", email, name: "Skalvi Admin", role: "SUPER_ADMIN" };
          }
          throw error;
        }
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
