'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/shared/utils/cn';

export const LuxuryHeader: React.FC = () => {
  const navLinks = [
    { label: 'Homepage', href: '/' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Auctions', href: '/marketplace?view=auctions' },
    { label: 'Blog', href: '#' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Investors', href: '#' },
  ];

  const languages = ['FR', 'EN', 'PT', 'ES', 'DE'];

  return (
    <header className={cn("fixed top-8 w-full z-[1000]")}>
      <div className={cn("flex justify-center")}>
        <div className={cn(
          "relative",
          "bg-white/95",
          "backdrop-blur-[20px]",
          "rounded-full",
          "shadow-[0_8px_32px_rgba(0,0,0,0.08)]",
          "border border-gray-100/50",
          "px-8",
          "py-4"
        )}>
          {/* Top accent bar */}
          <div className={cn(
            "absolute",
            "-top-[1px]",
            "left-1/2",
            "-translate-x-1/2",
            "w-[60px]",
            "h-[2px]",
            "bg-gradient-to-r from-[#D4AF37] via-[#E5C558] to-[#D4AF37]",
            "rounded-full"
          )} />
          
          <div className={cn(
            "flex",
            "items-center",
            "gap-x-8",
            "px-4",
            "py-2"
          )}>
            {/* Logo */}
            <Link 
              href="/" 
              className={cn(
                "text-[20px]",
                "font-light",
                "tracking-[1px]",
                "text-[#D4AF37]",
                "no-underline",
                "flex",
                "items-center",
                "gap-x-1.5"
              )}
            >
              <span className={cn("text-[24px]")}>⬡</span>
              InventorX
            </Link>

            {/* Navigation */}
            <nav className={cn(
              "flex",
              "gap-x-6",
              "items-center"
            )}>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "text-[#666666]",
                    "text-[13px]",
                    "font-normal",
                    "no-underline",
                    "hover:text-[#D4AF37]",
                    "transition-colors"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className={cn(
              "flex",
              "gap-x-3",
              "items-center",
              "ml-6"
            )}>
              <select className={cn(
                "px-3",
                "py-1.5",
                "bg-transparent",
                "text-[#666666]",
                "text-[13px]",
                "cursor-pointer",
                "outline-none",
                "border-none"
              )}>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              <button className={cn(
                "px-5",
                "py-1.5",
                "bg-[#D4AF37]",
                "text-white",
                "rounded-full",
                "text-[13px]",
                "font-medium",
                "hover:bg-[#B8941F]",
                "transition-colors"
              )}>
                LOGIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};