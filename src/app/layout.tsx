import type { Metadata, Viewport } from 'next';

import BottomNavLink from '@/components/BottomNavLink';
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
        <nav className="btm-nav">
          <BottomNavLink href="/">Test</BottomNavLink>
          <BottomNavLink href="/book">Books</BottomNavLink>
        </nav>
      </body>
    </html>
  );
}
