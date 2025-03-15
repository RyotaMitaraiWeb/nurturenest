import { getFullCart } from "@/actions/getFullCart";
import { getShoppingCartData } from "@/actions/getShoppingCartData";
import { auth } from "@/auth";
import { Heading } from "@/components/Heading";
import { CheckoutForm } from "@/ui/checkout/CheckoutForm";
import {Link, Typography } from "@mui/material";
import { cookies } from "next/headers";

export default async function Page() {
  const session = await auth();
  const shoppingCart = await getShoppingCartData();
  const items = Object.entries(shoppingCart);
  const fullCart = await getFullCart(items);
  const cookieStore = await cookies();
  const promotionContents = cookieStore.getAll().filter(cookie => cookie.name.startsWith('promotion-') && cookie.name.endsWith('-content')).map(cookie => cookie.value);
  
  return <section className="flex flex-col items-center gap-8">
    <Heading className="text-center" level={1}>Данни за поръчката</Heading>
    {session === null ? <Typography variant="subtitle1"><Link href="/auth/login">Влезте в профила</Link> си или <Link href="/auth/register">се регистрирайте</Link>, за да се попълнат полетата автоматично</Typography> : null}
   
    <CheckoutForm promotionContents={promotionContents} cart={fullCart} session={session} />
  </section>
}