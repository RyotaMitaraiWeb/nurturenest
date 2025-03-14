'use server';

import { prisma } from "@/prisma";

export async function updateDefaultPaymentMethod(initialState: number, form: FormData) {
  const userId = form.get('userId')!.toString();
  const paymentMethod = form.get('defaultPaymentMethod')!.toString();

  await prisma.user.update(
    {
      where: {
        id: userId,
      },
      data: {
        defaultPaymentMethod: paymentMethod,
      }
    }
  );

  return initialState + 1;
}