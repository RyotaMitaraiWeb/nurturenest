'use server';

import { prisma } from "@/prisma";
import { CartItem } from "@/types/cart";

export async function getFullCart(items: [string, CartItem][]) {
  const cartItems = await Promise.all(items.map(item => prisma.product.findUnique(
    {
      where: { id: Number(item[0])},
      select: {
        id: true,
        name: true,
        image: true,
        price: true
      }
    }
  ))
  );

  const cart = cartItems
    .filter(i => i !== null)
    .map(item => ({...item, price: item.price.toString() }))
    .map((item, i) => (
    {
      product: item,
      quantity: items[i][1].quantity,
    }
  ));

  return cart;
}