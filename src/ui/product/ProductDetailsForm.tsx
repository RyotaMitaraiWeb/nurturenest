'use client';

import { Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Snackbar } from "@mui/material";
import { QuantityForm } from "./QuantityForm";
import { ShoppingCart, LocalShipping, Loop } from "@mui/icons-material";
import { useActionState, useEffect, useState } from "react";
import { addProductToShoppingCart } from "@/actions/addProductToShoppingCart";

export function ProductDetailsForm({ id }: { id: number}) {
  const [state, action, pending] = useActionState(addProductToShoppingCart, 0);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state !== 0) { 
      setOpen(true);
      setTimeout(() => setOpen(false), 5_000);
    }
  }, [state]);
  return <section className="lg:mt-4">
  <form action={action} className="flex flex-col items-center lg:items-start gap-8">
    <input type="hidden" value={id} name="productId" />
    <div className="flex flex-col lg:flex-row gap-8">
      <QuantityForm />
      <Button disabled={pending} type="submit" size="large" variant="contained" className="w-max" startIcon={<ShoppingCart />}>
        Добави в количката
      </Button>
    </div>
    <List className="max-w-max lg:w-full lg:max-w-[initial] block ml-4" sx={{bgcolor: 'background.paper'}}>
      <ListItem sx={{borderLeft: '1px solid rgba(0, 0, 0, 0.12)', borderRight: '1px solid rgba(0, 0, 0, 0.12)', borderTop: '1px solid rgba(0, 0, 0, 0.12)'}}>
        <ListItemAvatar>
          <LocalShipping />
        </ListItemAvatar>
        <ListItemText primary="Безплатна доставка" secondary="За покупки на стойност над 100 лв." />
      </ListItem>
      <Divider component="li" />
      <ListItem sx={{borderLeft: '1px solid rgba(0, 0, 0, 0.12)', borderRight: '1px solid rgba(0, 0, 0, 0.12)', borderTop: '1px solid rgba(0, 0, 0, 0.12)'}}>
        <ListItemAvatar>
          <Loop />
        </ListItemAvatar>
        <ListItemText primary="Връщане на продукта до 30 дни" secondary="С цялата такса възстановена" />
      </ListItem>
      <Divider component="li" />
    </List>
  </form>
  <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} message="Продуктът е добавен в количката" />
</section>
}