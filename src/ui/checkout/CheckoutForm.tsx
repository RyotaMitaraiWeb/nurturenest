/* eslint-disable @next/next/no-img-element */
'use client';
import { buy } from "@/actions/buy";
import { Heading } from "@/components/Heading";
import { TextField, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button, Snackbar, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

type CheckoutFormProps = {
  cart: {
    product: {
      price: string;
      id: number;
      image: string;
      name: string;
    };
    quantity: number;
  }[];
}

export function CheckoutForm(props: CheckoutFormProps): React.JSX.Element {
  const fullCart = props.cart;
  const totalPrice = fullCart.reduce((total, item) => total + item.quantity * Number(item.product.price), 0)
  const shippingPrice = totalPrice >= 100 ? 0 : 9.99;

  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [state, action] = useActionState(buy, false);

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    setOpen(state);

    if (state) {
      setTimeout(() => router.push('/'), 3_000);
    }
  }, [state, router]);
  
  return <form action={action} className="flex flex-col lg:flex-row w-full gap-8 p-4">
          <section className="flex lg:w-1/2 flex-col items-center gap-8">
            <TextField className="w-3/4" name="firstName" defaultValue="" label="Име" />
            <TextField className="w-3/4" name="lastName" defaultValue="" label="Фамилия" />
            <TextField className="w-3/4" name="address" defaultValue="" label="Адрес" />
            <TextField className="w-3/4" name="phone" defaultValue="" label="Телефон" />
            <TextField className="w-3/4" name="email" defaultValue="" label="Имейл" />
            <TextField className="w-3/4" name="comments" defaultValue="" label="Бележки към поръчката" multiline />
          </section>
          <Divider className="lg:hidden" />
          <section className="flex flex-col gap-8 w-1/2">
            <ul>
              {fullCart.map(item => <li key={item.product.id} className="flex items-center justify-between">
                <span className="flex items-center gap-4">
                  <img src={item.product.image} className="w-13.5 h-auto" alt="" />
                  <Typography>{item.product.name} (x{item.quantity})</Typography>
                  <input type="hidden" name={item.product.id.toString()} value={item.quantity} />
                </span>
                <span>
                  <span>{(Number(item.product.price) * item.quantity).toFixed(2)} лв.</span>
                  <span>({item.quantity} x {Number(item.product.price).toFixed(2)} лв.)</span>
                </span>
              </li>)}
            </ul>
            <ul className="flex flex-col gap-4">
              <li className="border-b border-b-black">
                <span>Цена на артикули: </span>
                <span>{totalPrice.toFixed(2)} лв.</span>
              </li>
              <li className="border-b border-b-black">
                <span>Цена за доставка: </span>
                <span>{shippingPrice === 0 ? 'Безплатна' : `${shippingPrice.toFixed(2)} лв.`}</span>
              </li>
              <li>
                <span><strong>Общо:</strong> </span>
                <span>{(totalPrice + shippingPrice).toFixed(2)} лв.</span>
              </li>
            </ul>
            <Divider />
            <Heading level={2}>Начин на плащане</Heading>
            <FormControl>
              <RadioGroup
                defaultValue="cash"
                className="flex flex-col gap-4"
              >
                <FormControlLabel value="cash" name="paymentMethod" control={<Radio />} label="На място при доставка (кеш)" />
                <FormControlLabel value="card" name="paymentMethod" control={<Radio />} label="С карта" />
                <FormControlLabel value="bank" name="paymentMethod" control={<Radio />} label="Наложен платеж" />
                <FormControlLabel disabled={totalPrice < 100} value="partially1" name="paymentMethod" control={<Radio />} label="На изплащане (6 месеца)" />
                <FormControlLabel disabled={totalPrice < 100} value="partially2" name="paymentMethod" control={<Radio />} label="На изплащане (1 година)" />
                <FormControlLabel disabled={totalPrice < 100} value="partially3" name="paymentMethod" control={<Radio />} label="На изплащане (2 години)" />
              </RadioGroup>
            </FormControl>
            <Button disabled={fullCart.length === 0} type="submit" variant="contained" size="large">Плащане</Button>
          </section>
          <Snackbar anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }} open={open} onClose={handleClose} autoHideDuration={10_000} message="Успешна поръчка. Сега ще бъдете пренасочени" />
      </form>
}