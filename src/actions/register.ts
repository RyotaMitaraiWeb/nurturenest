'use server';
import bcrypt from 'bcrypt';
import { prisma } from "@/prisma";
import { Result } from '@/types/auth';
import { signIn } from '@/auth';
import { roleIds } from '@/common/roles';

export async function register(prevState: Result | null, formData: FormData): Promise<Result | null> {
  let data: Result;
  const username = formData.get('username')!.toString();
  const password = formData.get('password')!.toString();
  try {
    const passwordHash = await bcrypt.hash(password, 9);
    data = await prisma.user.create({
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

        },
        Role: {
          connect: {
            id: roleIds.user,
          }
        }
      }
    }) as Result;


  } catch {
    return null;
  }

  await signIn('credentials', {
    username,
    password,
    redirect: true,
    redirectTo: '/',
  });

  return data;
}