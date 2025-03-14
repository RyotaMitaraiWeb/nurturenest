import { auth } from "@/auth";
import { SidebarSection } from "@/ui/profile/SidebarSection";
import { Divider } from "@mui/material";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    return redirect('/auth/login')
  }

  const sections = [
    {
      heading: 'Данни и предпочитания',
      links: [
        {
          url: '/profile/data',
          text: 'Данни по подразбиране',
        },
        {
          url: '/profile/payment',
          text: 'Начин на плащане по подразбиране',
        },
      ]
    },
    {
      heading: 'Моите поръчки',
      links: [
        {
          url: '/profile/orders',
          text: 'Направени поръчки',
        },
      ]
    },
  ]

  return <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:items-start gap-8">
    <nav className="flex flex-col gap-4">
      {sections.map(section => <SidebarSection section={section} key={section.heading} />)}
    </nav>
    <Divider flexItem className="lg:hidden" />
    <Divider orientation="vertical" flexItem className="hidden lg:block" />
    <section className="lg:w-1/2 overflow-auto">
      {children}
    </section>
  </div>
}