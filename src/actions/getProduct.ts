'use server';

import { prisma } from "@/prisma";
import { ProductDetails } from "@/types/product";
import { notFound } from "next/navigation";

export async function getProduct(id: number): Promise<ProductDetails> {
  const product = await prisma.product.findUnique({ where: { id }, 
    include: { 
      Review: { 
        include: { 
          user: true,
        },
        orderBy: [{
          rating: 'desc',
        },
      {
        createdOn: 'desc',
      }]
      } 
    },
  });
  if (!product) {
    return notFound();
  }

  const averageRating = await prisma.review.aggregate(
    {
      _avg: {
        rating: true, 
      },
      where: {
        productId: id,
      }
    }
  );

  return { ...product, averageRating: averageRating._avg.rating || 0};
}