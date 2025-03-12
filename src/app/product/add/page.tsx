import { addProduct } from "@/actions/addProduct";
import { roles } from "@/common/roles";
import { Heading } from "@/components/Heading";
import { hasRole } from "@/lib/hasRole";
import { ProductForm } from "@/ui/product/ProductForm";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const canAccess = await hasRole(roles.manager);

  if (!canAccess) {
    return redirect('/');
  }


  return <section>
    <Heading level={1}>Добави нов продукт</Heading>
    <ProductForm action={addProduct} />
  </section>
}