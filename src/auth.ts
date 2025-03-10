import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcrypt';
import { prisma } from "./prisma";


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
  }
})