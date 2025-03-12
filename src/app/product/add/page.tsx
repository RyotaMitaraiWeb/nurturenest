import { addProduct } from "@/actions/addProduct";
import { roles } from "@/common/roles";
import { Heading } from "@/components/Heading";
import { hasRole } from "@/lib/hasRole";
import { GalleryForm } from "@/ui/product/GalleryForm";
import { ProductForm } from "@/ui/product/ProductForm";
import { ProductSections } from "@/ui/product/ProductSections";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const canAccess = await hasRole(roles.manager);

  if (!canAccess) {
    return redirect('/');
  }


  return <section>
    <Heading level={1}>Добави нов продукт</Heading>
    <form action={addProduct}>
      <ProductSections galleryChildren={<GalleryForm />} descriptionChildren={<ProductForm action={addProduct} />} />
    </form>
  </section>
}