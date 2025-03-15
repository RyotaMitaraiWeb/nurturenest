'use server';

import { prisma } from "@/prisma";

export async function getPromotion(promoCode: string, userId: string | null | undefined, productId: number) {
  if (!userId || !promoCode) {
    return null;
  }
  const promotion = await prisma.promotion.findFirst(
    {
      where: {
        promoCode,
        productId,
        userId,
      }
    }
  );

  if (promotion && !promotion.hasBeenChecked) {
    await prisma.promotion.update(
      {
        where: {
          id: promotion.id,
        },
        data: {
          hasBeenChecked: true,
        }
      }
    )
  }

  return promotion;
}