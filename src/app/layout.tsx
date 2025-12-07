import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grok Ads Studio",
  description: "Hyper-personalized ads, written by Grok",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
