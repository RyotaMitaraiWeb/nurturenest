'use client';

import { Snackbar } from "@mui/material";
import { Promotion } from "@prisma/client";
import { useEffect, useState } from "react";

type PromoCodeSnackbarProps = {
  promotion: Promotion | null;
}
export function PromoCodeSnackbar(props: PromoCodeSnackbarProps) {
  const [open, setOpen] = useState(true);


  useEffect(() => {
    if (props.promotion) {
      fetch('/api/promo', {
        method: 'POST',
        body: JSON.stringify(props.promotion),
      })
    }
  }, [props.promotion])
  if (!props.promotion) {
    return null;
  }

  return <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={20_000} onClose={() => setOpen(false)} content={`Успешно сканиран промо код! Вашата награда е: ${props.promotion.content}`} />
}