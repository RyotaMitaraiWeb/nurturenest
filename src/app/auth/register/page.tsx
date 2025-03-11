import { register } from "@/actions/register";
import { Heading } from "@/components/Heading";
import { AuthForm } from "@/ui/authForm/AuthForm";
import Image from "next/image";

export default async function Page() {
  return <section className="p-8 flex flex-col gap-4 lg:gap-16 justify-center items-center lg:flex-row">
    <Image priority className="max-w-full" src="/assets/register.jpg" alt="" width={612} height={556} />
    <div className="flex flex-col gap-12 items-center justify-center">
      <Heading className="w-max" level={1}>Създай нов профил</Heading>
      <AuthForm action={register} submitButtonText="Създай профил" successText="Успешна регистрация! Сега ще бъдете пренасочени" />
    </div>
  </section>
}