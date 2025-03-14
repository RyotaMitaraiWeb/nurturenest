import { Product, Review } from "@prisma/client";

export type ProductDetails = Product & {
  averageRating: number;
} & {
  Review: Review[],
}