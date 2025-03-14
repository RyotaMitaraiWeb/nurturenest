import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      address: string;
      phone: string;
      firstName: string;
      lastName: string;
      Role: {
        id: number;
        name: string;
      }[]
    } & DefaultSession["user"];
  }

  interface User {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    Role: {
      id: number;
      name: string;
    }[];
  }
}
