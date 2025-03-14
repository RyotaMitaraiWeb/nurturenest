/* eslint-disable @next/next/no-img-element */
'use client';

import { Heading } from "@/components/Heading";
import { Button, ClickAwayListener, Dialog, Divider, Link, List, ListItem, ListItemAvatar, ListItemText, TableCell, TableRow, TextField } from "@mui/material";
import { Order } from "@prisma/client";
import { useState } from "react";
import { ReturnForm } from "./ReturnForm";

type OrderTableRow = {
  order: Order & {
    products: {id: string;
      product: {
          name: string;
          image: string;
          price: string;
      };
      quantity: number;
      productId: number;}[]
  };
}
const paymentMethods: Record<string, string> = {
  cash: 'На място при доставка (кеш)',
  card: 'Карта',
  bank: 'Банков трансфер',
  partially1: 'На изплащане (6 месеца)',
  partially2: 'На изплащане (1 година)',
  partially3: 'На изплащане (2 година)',
};

export function OrderTableRow(props: OrderTableRow) {
  const [open, setOpen] = useState(false);

  return <TableRow>
    <TableCell>{props.order.id}</TableCell>
    <TableCell>{paymentMethods[props.order.paymentMethod]}</TableCell>
    <TableCell>{props.order.createdOn.toLocaleString('bg-BG', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        timeZone: 'Europe/Sofia' 
      })}
    </TableCell>
    <TableCell>
      <Button variant="contained" onClick={() => setOpen(true)}>Детайли</Button>
    </TableCell>
    <TableCell>
      <ReturnForm isReturned={props.order.isReturned} orderId={props.order.id} date={props.order.createdOn} />
    </TableCell>

    <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <div className="p-4 flex flex-col gap-4">
          <Heading level={2}>Покупка</Heading>
          <List>
            {props.order.products.map(product => <div key={product.productId}>
              <ListItem>
                <ListItemAvatar>
                  <img src={product.product.image} alt="" className="w-10 h-auto" />
                </ListItemAvatar>
                <ListItemText primary={<Link href={`/product/${product.productId}/${product.product.name.replaceAll(' ', '-').toLocaleLowerCase()}`}>{`${product.product.name} (x${product.quantity})`}</Link>} secondary={`${(Number(product.product.price.toString()) * product.quantity).toFixed(2)} лв.`} />
              </ListItem>
            </div>)}
            <Divider component="li" />
          </List>
          <Heading level={2}>Получател</Heading>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <TextField disabled value={props.order.firstName} />
              <TextField disabled value={props.order.lastName} />
            </div>
            <TextField disabled value={props.order.address} />
            <TextField disabled value={props.order.phone} />
            <TextField disabled value={props.order.email} />
            <TextField disabled value={props.order.comments} />
          </div>
        </div>
      </ClickAwayListener>
    </Dialog>
  </TableRow>
}