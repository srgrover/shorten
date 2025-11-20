import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FooterComponent, NavComponent } from "@/components";
import { Providers } from "@/components/providers/Providers";
import { auth } from "@/auth.config";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "slgs - An app to shorten links",
  description: "An app to shorten links",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers session={session}>
            <NavComponent />
            <main className="flex w-full pl-0 pr-0 px-0! pb-3 lg:px-4 sticky top-0 z-40 bg-white dark:bg-neutral-900" style={{ paddingLeft: 0, paddingRight: 0 }}>
              { children }
            </main>
            <FooterComponent />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
