// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'EL\'RUH | Шепот Востока',
  description: 'Масляные духи ручной работы',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="bg-black text-white min-h-screen">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
