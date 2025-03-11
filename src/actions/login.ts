'use server';
import { Result } from '@/types/auth';
import { signIn } from '@/auth';
import { prisma } from '@/prisma';
import bcrypt from 'bcrypt';

export async function login(prevState: Result | null, formData: FormData): Promise<Result | null> {
  const username = formData.get('username')!.toString();
  const password = formData.get('password')!.toString();

  const account = await prisma.account.findFirst({
    where: {
      user: {
        name: username
      }
    }
  });

  if (!account) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(password, account.password!);

  if (!passwordMatches) {
    return null;
  }

  await signIn('credentials', { username, password, redirectTo: '/', redirect: true });
  return { id: '1' } as Result;
}
