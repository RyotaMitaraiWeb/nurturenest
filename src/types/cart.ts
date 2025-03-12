export type ShoppingCart = Record<number, CartItem>;
type CartItem = {
  quantity: number;
}