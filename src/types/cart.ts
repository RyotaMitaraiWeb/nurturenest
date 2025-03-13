export type ShoppingCart = Record<number, CartItem>;
export type CartItem = {
  quantity: number;
}