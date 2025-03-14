import { Product, Review, User } from "@prisma/client";

export type ProductDetails = Product & {
  averageRating: number;
} & {
  Review: (Review & { user: User })[],
}