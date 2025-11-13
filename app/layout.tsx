import type { Metadata } from "next";
import { Exo } from "next/font/google";
import "./globals.css";

const exo = Exo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-exo",
});

export const metadata: Metadata = {
  title: "OJA - Portfolio",
  description:
    "This is my portfolio website to show case all my experience and knowledge in web development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={exo.variable}>
      <body>{children}</body>
    </html>
  );
}
