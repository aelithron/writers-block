import type { Metadata } from "next";
import { Gowun_Dodum } from "next/font/google";
import "./globals.css";

const gowunDodum = Gowun_Dodum({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: {
    template: "%s ~ Writer's Block",
    default: "Writer's Block"
  },
  description: "A simple writing webapp with powerful tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gowunDodum.className}`}
      >
        {children}
      </body>
    </html>
  );
}
