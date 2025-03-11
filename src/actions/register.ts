'use server';
import bcrypt from 'bcrypt';
import { prisma } from "@/prisma";
import { Result } from '@/types/auth';

export async function register(prevState: Result | null, formData: FormData): Promise<Result | null> {
  try {
    const username = formData.get('username')!.toString();
    const password = formData.get('password')!.toString();

    const passwordHash = await bcrypt.hash(password, 9);
    const data = await prisma.user.create({
      data: {
        name: username,
        accounts: {
          create:
          {
            password: passwordHash,
            providerAccountId: username,
            provider: 'credentials',
            type: 'credentials'
          }

        }
      }
    });

    return data;

  } catch {
    return null;
  }
}