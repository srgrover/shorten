import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TopMenu } from "@/components";
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
            <TopMenu />
            {children}
            <Toaster />
          </Providers>
        </body>
    </html>
  );
}
