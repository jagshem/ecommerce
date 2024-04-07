import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, auth } from '@clerk/nextjs';
import { ModalProvider } from "@/providers/modal-provider";
import { ToasterProvider } from '@/providers/toast-provider';
import prismadb from '@/lib/prismadb';
import { redirect } from 'next/navigation';
import React from 'react';

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();

  if (userId === null) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId
    }
  });
  // Prismadb'den store.name değerini alın
  const storeName = `${store?.name} Dashboard`;
  const storeDescription = `${store?.name} Admin Dashboard, ${store?.id} Store ID Dashboard`;

  // metadata nesnesini güncelleyin
  const metadata: Metadata = {
    title: storeName,
    description: storeDescription,
  };

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
        <title>{String(metadata.title)}</title>
        </head>
        <body className={inter.className}>
          <ToasterProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
