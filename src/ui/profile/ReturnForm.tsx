'use client';

import { returnOrder } from "@/actions/returnOrder";
import { isMoreThanDaysAfter } from "@/lib/isMoreThanDaysAfter";
import { Button } from "@mui/material";
import { useRef } from "react";

type ReturnFormProps = {
  date: Date;
  isReturned: boolean;
  orderId: string;
}

export function ReturnForm(props: ReturnFormProps) {
  const date = useRef(new Date(Date.now()));

  const isMoreThan30DaysAfter = isMoreThanDaysAfter(date.current, props.date, 30);

  return <form action={returnOrder}>
    <input type="hidden" name="orderId" value={props.orderId} />
    <Button color="error" type="submit" variant="contained" disabled={isMoreThan30DaysAfter || props.isReturned}>Върни</Button>
  </form>
}