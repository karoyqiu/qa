'use client';

import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import cn from './cn';

type TopNavLinkProps = ComponentProps<typeof Link> & {
  currentHref: string;
  text: string;
  icon?: ReactNode;
  activeIcon?: ReactNode;
};

export default function TopNavLink(props: TopNavLinkProps) {
  const { currentHref, text, icon, activeIcon, className, ...rest } = props;
  const isActive = currentHref === rest.href;

  return (
    <li>
      <Link className={cn(className, isActive && 'text-primary')} {...rest}>
        {isActive ? activeIcon ?? icon : icon}
        <span className="btm-nav-label">{text}</span>
      </Link>
    </li>
  );
}
