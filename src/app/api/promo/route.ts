import { Promotion } from "@prisma/client";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const promotion = await request.json() as Promotion;
  const cookieStore = await cookies();
  cookieStore.set('promotion-' + promotion.promoCode, promotion.content);
  cookieStore.set(`promotion-${promotion.promoCode}-type`, promotion.type);

  return Response.json({ promoCode: promotion.promoCode }, { status: 200, statusText: 'ok' })
}