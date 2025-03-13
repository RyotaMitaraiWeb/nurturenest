'use client';

import { Session } from "next-auth";
import { SearchFieldMobile } from "./SearchFieldMobile";
import { CartSummary } from "./CartSummary";
import { ProfileMenu } from "./ProfileMenu";
import Image from "next/image";
import Logo from '../../../public/assets/nurture_nest_logo_heading.svg';
import Link from "next/link";
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
  return <>
      <nav className="p-4 pb-0 flex justify-between items-center">
        <Image src={Logo} alt="" width={100} className="mb-2" />
        <div>
          <div className="flex justify-end gap-4">
            <SearchFieldMobile />
            <CartSummary cart={props.cart} />
            <ProfileMenu session={props.session} />
          </div>
        </div>
      </nav>
      <nav className="flex justify-end p-4 bg-[#6a8e21] text-white mb-8">
        <ul className="flex gap-8 top-8 right-0">
          <li>
            <Link className="hover:underline" href="/">Начало</Link>
          </li>
          <li>
            <Link className="hover:underline" href="/about">За нас</Link>
          </li>
          <li>
            <Link className="hover:underline" href="/contacts">Контакти</Link>
          </li>
        </ul>
      </nav>
  </>
}