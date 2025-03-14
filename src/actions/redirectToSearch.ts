'use server';

import { redirect } from "next/navigation";

export async function redirectToSearch(form: FormData) {
  const search = form.get('search')!.toString();

  redirect(`/search?search=${search}`);
}