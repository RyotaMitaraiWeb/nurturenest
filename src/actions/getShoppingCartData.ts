'use server';

import { ShoppingCart } from "@/types/cart";
import { cookies } from "next/headers";

export async function getShoppingCartData() {
  const cookieStore = await cookies();
  const cartJson = cookieStore.get('cart')?.value || "{}";
  const cart = JSON.parse(cartJson) as ShoppingCart;
  return cart;
}