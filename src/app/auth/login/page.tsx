import { signIn } from "@/auth";
import { Button } from "@mui/material";

export default async function Page() {
  async function action(formData: FormData) {
    'use server';
    const username = formData.get('username')!.toString();
    const password = formData.get('password')!.toString();
    try {
      await signIn("credentials", { username, password });
      console.log('HELLO');
    } catch {
    }
  }

  return <form action={action}>
    <input name="username" />
    <input type="password" name="password" />
    <Button type="submit">Влез</Button>
  </form>
}