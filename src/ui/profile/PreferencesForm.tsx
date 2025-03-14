'use client';
import { updatePreferences } from "@/actions/updatePreferences";
import { Button, Snackbar, TextField } from "@mui/material";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

type PreferencesForm = {
  session: Session;
}

export function PreferencesForm(props: PreferencesForm) {
  const [state, action] = useActionState(updatePreferences, 0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state) {
      setOpen(true);
      redirect('/profile/data');
      
    }
  }, [state])
  return <form className="flex flex-col gap-4" action={action}>
      <input type="hidden" name="userId" defaultValue={props.session.user.id} />
      <div className="flex flex-col lg:flex-row gap-4">
        <TextField label="Име" name="firstName" defaultValue={props.session.user.firstName} />
        <TextField label="Фамилия" name="lastName" defaultValue={props.session.user.lastName} />
      </div>
      <TextField label="Адрес" name="address" defaultValue={props.session.user.address} />
      <TextField label="Телефон" name="phone" defaultValue={props.session.user.phone} />
      <TextField label="Имейл" name="email" defaultValue={props.session.user.email} />
      <Button variant="contained" type="submit">Запази</Button>
      <Snackbar open={open} onClose={() => setOpen(false)} message="Данните са обновени успешно" />
    </form>
}