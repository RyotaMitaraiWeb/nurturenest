'use server';

import { prisma } from "@/prisma";

export async function getBestSellers() {
  const topThreeProducts = await prisma.product.findMany({
    take: 3,
    select: {
      Purchase: true,
      image: true,
      name: true,
      id: true,
    },
    orderBy: {
      Purchase: {
        _count: 'desc',
      }
    },
  });

  return topThreeProducts;
}