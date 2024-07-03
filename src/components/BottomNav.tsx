'use client';

import Link from "next/link";

export default function BottomNav() {
  return (
    <nav className="btm-nav">
          <Link href="test">
            <span className="btm-nav-label">Test</span>
          </Link>
          <Link href="book">
            <span className="btm-nav-label">Books</span>
          </Link>
        </nav>
  )
}
