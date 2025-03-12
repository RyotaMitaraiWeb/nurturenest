import { auth } from "@/auth";

export async function hasRole(role: string) {
  const session = await auth();
  const roles = session?.user.Role || [];

  return !!roles.find(r => r.name === role);
}