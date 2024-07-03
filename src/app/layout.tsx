import type { Metadata, Viewport } from 'next';

import BottomNav from '@/components/BottomNav';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Questions & Answers',
    default: 'Questions & Answers',
  },
  description: 'Questions & Answers',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <BottomNav/>
      </body>
    </html>
  );
}
