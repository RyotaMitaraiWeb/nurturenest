'use client';
import { Result } from "@/types/auth"
import { Button, TextField, Typography } from "@mui/material";
import React, { useActionState } from "react"

type AuthFormProps = {
  action: (prevState: Result | null, formData: FormData) => Promise<Result | null>,
  submitButtonText: React.ReactNode;
  successText: React.ReactNode;
}

export function AuthForm(props: AuthFormProps): React.JSX.Element {
  const [state, action, pending] = useActionState(props.action, {
      id: '',
      name: '',
      createdAt: new Date('1'),
      updatedAt: new Date('1'),
      image: null,
    });
  return <form action={action} className="flex w-full flex-col gap-10 items-center justify-center">
    <div className="w-full">
      <TextField className="w-full" name="username" label="Потребителско име" />
    </div>
    <div className="w-full">
      <TextField className="w-full" name="password" label="Парола" type="password" />
    </div>
    <Button size="large" type="submit" disabled={pending} variant="contained" color="primary">{props.submitButtonText}</Button>
    {state?.id ? <Typography color="primary" fontWeight="500">{props.successText}</Typography> : <Typography color="primary" fontWeight="500" className="invisible">{props.successText}</Typography>}
  </form>
}