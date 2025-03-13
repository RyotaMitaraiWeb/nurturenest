/* eslint-disable @next/next/no-img-element */
import { buy } from "@/actions/buy";
import { getFullCart } from "@/actions/getFullCart";
import { getShoppingCartData } from "@/actions/getShoppingCartData";
import { auth } from "@/auth";
import { Heading } from "@/components/Heading";
import { Button, FormControl, FormControlLabel, Link, Radio, RadioGroup, TextField, Typography } from "@mui/material";

export default async function Page() {
  const session = await auth();
  const shoppingCart = await getShoppingCartData();
  const items = Object.entries(shoppingCart);
  const fullCart = await getFullCart(items);
  const totalPrice = fullCart.reduce((total, item) => total + item.quantity * Number(item.product.price), 0)
  const shippingPrice = totalPrice >= 100 ? 0 : 9.99;
  return <section>
    <Heading level={1}>Данни за поръчката</Heading>
    {session !== null ? <Typography variant="subtitle1"><Link href="/auth/login">Влезте в профила</Link> си или <Link href="/auth/register">се регистрирайте</Link>, за да се попълнат полетата автоматично</Typography> : null}
    <form action={buy}>
      <section>
        <TextField name="firstName" defaultValue="" label="Име" />
        <TextField name="lastName" defaultValue="" label="Фамилия" />
        <TextField name="address" defaultValue="" label="Адрес" />
        <TextField name="phone" defaultValue="" label="Телефон" />
        <TextField name="email" defaultValue="" label="Имейл" />
      </section>
      <section>
        <ul>
          {fullCart.map(item => <li key={item.product.id}>
            <span>
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
        <ul>
          <li>
            <span>Цена на артикули: </span>
            <span>{totalPrice.toFixed(2)} лв.</span>
          </li>
          <li>
            <span>Цена за доставка: </span>
            <span>{shippingPrice === 0 ? 'Безплатна' : `${shippingPrice.toFixed(2)} лв.`}</span>
          </li>
          <li>
            <span><strong>Общо:</strong> </span>
            <span>{(totalPrice + shippingPrice).toFixed(2)} лв.</span>
          </li>
        </ul>
        <Heading level={2}>Начин на плащане</Heading>
        <FormControl>
          <RadioGroup
            defaultValue="cash"
          >
            <FormControlLabel value="cash" name="paymentMethod" control={<Radio />} label="На място при доставка (кеш)" />
            <FormControlLabel value="card" name="paymentMethod" control={<Radio />} label="С карта" />
            <FormControlLabel value="bank" name="paymentMethod" control={<Radio />} label="Наложен платеж" />
            <FormControlLabel disabled={totalPrice < 100} value="partially1" name="paymentMethod" control={<Radio />} label="На изплащане (6 месеца)" />
            <FormControlLabel disabled={totalPrice < 100} value="partially2" name="paymentMethod" control={<Radio />} label="На изплащане (1 година)" />
            <FormControlLabel disabled={totalPrice < 100} value="partially3" name="paymentMethod" control={<Radio />} label="На изплащане (2 години)" />
          </RadioGroup>
        </FormControl>
        <Button type="submit" variant="contained" size="large">Плащане</Button>
      </section>
    </form>
  </section>
}