import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from "@mui/material";
import theme from "@/theme";
import { auth } from "@/auth";
import { Navigation } from "@/ui/navigation/Navigation";
import { getShoppingCartData } from "@/actions/getShoppingCartData";
import { getFullCart } from "@/actions/getFullCart";
import { Footer } from "@/ui/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const cart = await getShoppingCartData();
  const items = Object.entries(cart);
  const fullCart = await getFullCart(items);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <Navigation session={session} cart={fullCart} />
            <main>
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
