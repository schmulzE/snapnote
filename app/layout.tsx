import "./globals.css";
import { Toaster } from 'sonner';
import type { Metadata } from "next";
import 'remixicon/fonts/remixicon.css';
import { AuthProvider } from "./provider";
import NextTopLoader from 'nextjs-toploader';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

export const metadata: Metadata = {
  title: "SnapNote – Effortless Note Taking & Organization",
  description: "SnapNote helps you capture, organize, and access your notes seamlessly. Enjoy a fast, modern note-taking experience with secure authentication and intuitive features.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <Toaster richColors/>
        <NextTopLoader />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
