'use client';

import { generateCode } from "@/actions/generateCode";
import { TextField, Button, Typography } from "@mui/material";
import { useActionState } from "react";

export function PromoCodeForm() {
  const [code, action] = useActionState(generateCode, '');

  return <form action={action}>
      <TextField label="Идентификатор на продукт" name="productId" />
      <TextField label="Идентификатор на потребител" name="userId" />
      <TextField className="w-100" multiline label="Съдържание" name="text" />
      <Button type="submit">Създай</Button>
      <Typography>{code}</Typography>
</form>
}