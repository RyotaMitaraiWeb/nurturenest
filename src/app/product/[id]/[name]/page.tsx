import { getProduct } from "@/actions/getProduct";

export default async function Page({ params }: { params: Promise<{ id: string }>}) {
  const p = await params;
  const id = Number(p.id);

  const product = await getProduct(id);
  return <h1>{product.name}</h1>
}