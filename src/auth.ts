import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcrypt';
import { prisma } from "./prisma";
import { Role } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findFirst({
          where: {
            name: credentials.username!,
          },
          include: {
            accounts: true,
            Role: true,
          }
        });

        const account = user?.accounts[0];
        if (!account) {
          return null;
        }

        const passwordMatches = await bcrypt.compare(credentials.password as string, account.password!);
        if (!passwordMatches) {
          return null;
        }

        return user
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/logout'
  },
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token }) {
      const user = await prisma.user.findFirst({ where: { name: token.name }, include: { Role: true }});
      if (!token.roles) {
        token.roles = user?.Role;
      }

      token.firstName = user!.firstName;
      token.lastName = user!.lastName;
      token.address = user!.address;
      token.phone = user!.phone;
      token.email = user!.email;
      token.id = user!.id;
      token.defaultPaymentMethod = user!.defaultPaymentMethod;
      return token;
    },
    session: async ({session, token }) => {
      session.user.Role = token.roles as Role[];
      session.user.firstName = token.firstName as string;
      session.user.lastName = token.lastName as string;
      session.user.email = token.email as string;
      session.user.address = token.address as string;
      session.user.phone = token.phone as string;
      session.user.id = token.id as string;
      session.user.defaultPaymentMethod = token.defaultPaymentMethod as string;
      return session;
    },
    
  }
})