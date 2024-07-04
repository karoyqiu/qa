'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import type { ComponentProps, ReactNode } from 'react';
import cn from './cn';

type BottomNavLinkProps = ComponentProps<typeof Link> & {
  text: string;
  icon?: ReactNode;
  activeIcon?: ReactNode;
};

export default function BottomNavLink(props: BottomNavLinkProps) {
  const { text, icon, activeIcon, className, ...rest } = props;
  const segment = useSelectedLayoutSegment() ?? '';
  const isActive = rest.href === `/${segment}`;

  return (
    <Link className={cn(className, isActive && 'active text-primary')} {...rest}>
      {isActive ? activeIcon ?? icon : icon}
      <span className="btm-nav-label">{text}</span>
    </Link>
  );
}
