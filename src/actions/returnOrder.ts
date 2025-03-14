'use server';

import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

export async function returnOrder(form: FormData) {
  const orderId = form.get('orderId')!.toString();

  await prisma.order.update(
    {
      where: {
        id: orderId,
      },
      data: {
        isReturned: true,
      }
    },
  );

  return redirect('/profile/orders');
}