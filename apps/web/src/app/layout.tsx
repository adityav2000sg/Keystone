import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Keystone — Your AI Chief of Staff",
  description:
    "Turn Gmail and Calendar into a Today Command Center. Receipts-first priorities, safe drafts, and zero auto-send. Nothing slips. Not ever.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased grain-overlay`}>
        {children}
      </body>
    </html>
  );
}
