'use client';

import { updateDefaultPaymentMethod } from "@/actions/updateDefaultPaymentMethod";
import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

const paymentMethods: Record<string, string> = {
  cash: 'На място при доставка (кеш)',
  card: 'Карта',
  bank: 'Банков трансфер',
  partially1: 'На изплащане (6 месеца)',
  partially2: 'На изплащане (1 година)',
  partially3: 'На изплащане (2 година)',
};

type PaymentMethodPreferenceProps = {
  session: Session;
}

export function PaymentMethodPreferenceForm(props: PaymentMethodPreferenceProps) {
  const paymentMethod = props.session.user.defaultPaymentMethod;

  const [initialState, action] = useActionState(updateDefaultPaymentMethod, 0);
  const router = useRouter();
  useEffect(() => {
    if (initialState) {
      router.push('/profile/payment');
    }
  }, [initialState, router])
  return <div>
    <form className="flex flex-col gap-4" action={action}>
      <input type="hidden" value={props.session.user.id} name="userId" />
      <FormControl>
        <RadioGroup className="flex flex-col gap-2" name="defaultPaymentMethod" defaultValue={paymentMethod}>
          {Object.entries(paymentMethods).map(pm => <FormControlLabel key={pm[0]} value={pm[0]} label={pm[1]} control={<Radio />}></FormControlLabel>)}
        </RadioGroup>
      </FormControl>
      <Button variant="contained" type="submit" className="w-max">Запази</Button>
    </form>
  </div>
}