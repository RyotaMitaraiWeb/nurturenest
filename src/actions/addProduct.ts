'use server';

import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

export async function addProduct(form: FormData) {
  const name = form.get('name')!.toString();
  const image = form.get('image')!.toString();
  const price = Number(form.get('price')?.toString());
  const roundedPrice = Number(price.toFixed(2));
  const shortDescription = form.get('shortDescription')!.toString();
  const description = form.get('description')!.toString();
  const minimumAge = Math.floor(Number(form.get('minimumAge')));
  const maximumAge = Math.floor(Number(form.get('maximumAge'))) || null;
  const videoUrl = form.get('video')!.toString();

  const data = await prisma.product.create({
    data: {
      name,
      image,
      price: roundedPrice,
      shortDescription,
      longDescription: description,
      minimumAge,
      maximumAge,
      videoUrl,
    }
  });

  if (data) {
    redirect(`/product/${data.id}/${data.name.replaceAll(' ', '-').toLocaleLowerCase()}`)
  }
}