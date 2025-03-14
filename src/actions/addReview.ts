'use server';

import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

export async function addReview(form: FormData) {
  const userId = form.get('userId')!.toString();
  const rating = Number(form.get('rating'));
  const productId = Number(form.get('productId'));
  const review = form.get('review')!.toString();

  await prisma.review.create(
    {
      data: {
        userId,
        rating,
        text: review,
        productId,
      }
    }
  );

  redirect(`/product/${productId}/${productId}`);
}