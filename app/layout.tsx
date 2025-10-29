import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";

import Providers from "@/components/layout/providers";

import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Hiring Management",
    default: "Hiring Management",
  },
  description:
    "A hiring management application to streamline your recruitment process.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${nunitoSans.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
