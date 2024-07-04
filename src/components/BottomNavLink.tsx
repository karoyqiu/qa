'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import type { ComponentProps } from 'react';
import cn from './cn';

type BottomNavLinkProps = ComponentProps<typeof Link>;

export default function BottomNavLink(props: BottomNavLinkProps) {
  const { className, children, ...rest } = props;
  const segment = useSelectedLayoutSegment() ?? '';

  return (
    <Link className={cn(className, rest.href === `/${segment}` && 'active text-primary')} {...rest}>
      <span className="btm-nav-label">{children}</span>
    </Link>
  );
}
