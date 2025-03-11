'use server';
import { Result } from '@/types/auth';
import { signIn } from '@/auth';

export async function login(prevState: Result | null, formData: FormData): Promise<Result | null> {
  const username = formData.get('username')!.toString();
  const password = formData.get('password')!.toString();

  await signIn('credentials', { username, password, redirectTo: '/', redirect: true });
  return { id: '1'} as Result;
}
