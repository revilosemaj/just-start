import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoCond = Roboto_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Just Start",
  description:
    "This is my portfolio to show case all my experience and knowdledge in Nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={robotoCond.className}>{children}</body>
    </html>
  );
}
