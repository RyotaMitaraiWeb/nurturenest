import { login } from "@/actions/login";
import { Heading } from "@/components/Heading";
import { AuthForm } from "@/ui/authForm/AuthForm";
import Image from "next/image";

export default async function Page() {
return <section className="p-8 flex flex-col gap-4 lg:gap-16 justify-center items-center lg:flex-row">
    <Image priority className="max-w-full w-[612px] h-auto" width={1000} height={667} src="/assets/login.jpg" alt="" />
    <div className="flex flex-col gap-12 items-center justify-center">
      <Heading className="w-max" level={1}>Влез в твоя профил</Heading>
      <AuthForm action={login} submitButtonText="Влез в профил" successText="Успешно влизане! Сега ще бъдете пренасочени" />
    </div>
  </section>
}