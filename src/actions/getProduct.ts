'use server';

import { prisma } from "@/prisma";
import { Product } from "@prisma/client";
import { notFound } from "next/navigation";

export async function getProduct(id: number): Promise<Product> {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    return notFound();
  }

  return product;
}