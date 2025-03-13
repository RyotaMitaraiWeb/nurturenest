'use server';

import { auth } from "@/auth";
import { prisma } from "@/prisma";

export async function getOrders() {
  const session = await auth();
  const userId = session?.user.id;

  const orders = await prisma.order.findMany({ where: {
    userId
  }, include: { products: { select: {
    productId: true,
    quantity: true,
    id: true,
    product: {
      select: {
        image: true,
        name: true,
        price: true,
      }
    }
  }} }});

  return orders;
}