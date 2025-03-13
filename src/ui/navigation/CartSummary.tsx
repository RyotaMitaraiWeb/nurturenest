/* eslint-disable @next/next/no-img-element */
'use client';

import { PointOfSale, ShoppingCart } from "@mui/icons-material";
import { Button, IconButton, ListItem, ListItemAvatar, ListItemText, Menu, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

type CartSummaryProps = {
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
export function CartSummary(props: CartSummaryProps) {
  const items = props.cart;
  const [open, setOpen] = useState(false);
  const el = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();

  function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    setOpen(true);
  }

  function handleFullButtonClick(event: React.MouseEvent) {
    event.preventDefault();
    router.push('/checkout');
    setOpen(false);
  }

  return <>
    <IconButton size="large" ref={el} onClick={handleClick}>
      <ShoppingCart />
    </IconButton>
    <Menu className="w-full" open={open} anchorEl={el.current} onClose={() => setOpen(false)}>
        <ListItem>
          <Typography color="text.secondary">Количка</Typography>
        </ListItem>
        {items.map(item => <ListItem className="flex gap-4" key={item.product.id}>
          <ListItemAvatar>
            <img className="w-15 h-auto" src={item.product.image} alt="" />
          </ListItemAvatar>
          <ListItemText>
            {item.product.name} (x{item.quantity})
          </ListItemText>
        </ListItem>)}
      <li className="flex justify-center w-full">
        <Button startIcon={<PointOfSale />} onClick={handleFullButtonClick} className="w-full">Към касата</Button>
      </li>
    </Menu>
  </>
}