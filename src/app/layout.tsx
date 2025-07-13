import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { Providers } from "./_components/providers";
import { ThemeProvider } from "~/components/theme-provider";

export const metadata: Metadata = {
  title: "SkillDrift - Your Learning Platform",
  description: "A secure learning platform built with T3 stack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <ThemeProvider defaultTheme="system">
          <Providers>
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
