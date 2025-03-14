'use server';

import { prisma } from "@/prisma";

export async function updatePreferences(initialState: number, form: FormData) {
  const userId = form.get('userId')!.toString();
  const firstName = form.get('firstName')!.toString();
  const lastName = form.get('lastName')!.toString();
  const address = form.get('address')!.toString();
  const phone = form.get('phone')!.toString();
  const email = form.get('email')!.toString();

  console.log('USER BELOW');
  console.log(userId);

  await prisma.user.update(
    {
      where: {
        id: userId,
      },
      data: {
        firstName,
        lastName,
        phone,
        address,
        email,
      }
    }
  );

  return initialState + 1;
}