'use server';

import { generateCodeId } from "@/lib/generateCodeId";
import { prisma } from "@/prisma";

export async function generateCode(_initialState: string, form: FormData) {
  const productId = Number(form.get('productId')!.toString());
  const userId = form.get('userId')!.toString();
  const content = form.get('text')!.toString();
  const code = generateCodeId();

  await prisma.promotion.create(
    {
      data: {
        type: 'gift',
        promoCode: code,
        userId,
        productId,
        content,
      }
    }
  );

  return code;
}