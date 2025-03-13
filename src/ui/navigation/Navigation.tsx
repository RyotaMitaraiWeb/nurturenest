'use client';

import { Session } from "next-auth";
import { SearchFieldMobile } from "./SearchFieldMobile";
import { CartSummary } from "./CartSummary";
import { ProfileMenu } from "./ProfileMenu";

type NavigationProps = {
  session: Session | null;
  cart: {
    product: {
      price: string;
      name: string;
      id: number;
      image: string;
    };
    quantity: number;
  }[]
}

export function Navigation(props: NavigationProps) {
  return <nav className="border-b border-b-gray-400">
    <div className="w-[118px] h-[50px] logo"></div>
    {/* to-do: make this into a search field on desktop */}
    {/* <TextField /> */}
    <SearchFieldMobile />
    <CartSummary cart={props.cart} />
    <ProfileMenu session={props.session} />


  </nav>
}