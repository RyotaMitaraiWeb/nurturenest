'use server';

import { ShoppingCart } from "@/types/cart";
import { cookies } from "next/headers";

export async function addProductToShoppingCart(_initialState: number, formData: FormData) {
  const cookieStore = await cookies();
  const productId = Number(formData.get('productId'));
  const quantity = Number(formData.get('quantity'));

  const shoppingCartJson = cookieStore.get('cart')?.value || "{}";
  const shoppingCart = JSON.parse(shoppingCartJson) as ShoppingCart;

  if (!shoppingCart[productId]) {
    shoppingCart[productId] = {
      quantity
    }
  }
  shoppingCart[productId].quantity = quantity;
  
  cookieStore.set('cart', JSON.stringify(shoppingCart));

  return quantity;
}