'use server';

import { prisma } from "@/prisma";
import { SearchResult } from "@/types/search";

export async function searchProducts(search: string): Promise<SearchResult[]> {
  const products = await prisma.product.findMany(
    {
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        }
      },
      select: {
        name: true,
        id: true,
        price: true,
        image: true,
      }
    }
  );

  return products.map(p => ({...p, productId: p.id , price: Number(p.price.toString())}))
}