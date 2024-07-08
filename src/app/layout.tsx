import {
  BookOpenIcon as BookOpenIconOutline,
  HomeIcon as HomeIconOutline,
  PencilIcon as PencilIconOutline,
} from '@heroicons/react/24/outline';
import {
  BookOpenIcon as BookOpenIconSolid,
  HomeIcon as HomeIconSolid,
  PencilIcon as PencilIconSolid,
} from '@heroicons/react/24/solid';
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
        <nav className="btm-nav md:hidden">
          <BottomNavLink
            href="/"
            text="Home"
            icon={<HomeIconOutline />}
            activeIcon={<HomeIconSolid />}
          />
          <BottomNavLink
            href="/exam"
            text="Exam"
            icon={<PencilIconOutline />}
            activeIcon={<PencilIconSolid />}
          />
          <BottomNavLink
            href="/book"
            text="Book"
            icon={<BookOpenIconOutline />}
            activeIcon={<BookOpenIconSolid />}
          />
        </nav>
      </body>
    </html>
  );
}
