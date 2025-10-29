'/* stylelint-disable */'
'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/shared/utils/cn';

export interface BackLinkButtonProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href?: string;
  label?: string;
}

export const BackLinkButton: React.FC<BackLinkButtonProps> = ({
  href,
  label = 'Back',
  className,
  ...props
}) => {
  const router = useRouter();

  const content = (
    <span className={cn('inline-flex items-center gap-2 text-[#666666] hover:text-[#D4AF37] transition-colors', className)}>
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      {label}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={className} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <a
      role="button"
      onClick={(e) => {
        e.preventDefault();
        router.back();
      }}
      className={className}
      {...props}
    >
      {content}
    </a>
  );
};


