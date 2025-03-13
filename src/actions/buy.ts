'use server';

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function buy(form: FormData) {
  const session = await auth();

  const firstName = form.get('firstName')!.toString();
  const lastName = form.get('lastName')!.toString();
  const address = form.get('address')!.toString();
  const phone = form.get('phone')!.toString();
  const email = form.get('email')!.toString();
  const comments = form.get('comments')!.toString();

  const userId = session?.user.id;
  const paymentMethod = form.get('paymentMethod')!.toString();
  const products = Array.from(
    form.entries()
    .filter(product => Number(product[0]))
    .map(product => ({ productId: Number(product[0]), quantity: Number(product[1])})));

  await prisma.order.create({
    data: {
      paymentMethod,
      userId,
      firstName,
      lastName,
      address,
      comments,
      phone,
      email,
      products: {
        create: products,
      }
    },
  });

  const cookieStore = await cookies();
  cookieStore.delete('cart');

  redirect('/');
}