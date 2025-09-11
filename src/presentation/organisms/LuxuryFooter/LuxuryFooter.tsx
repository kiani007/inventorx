'use client';

import React from 'react';
import Link from 'next/link';

const footerLinks = {
  platform: [
    { label: 'How It Works', href: '#' },
    { label: 'For Inventors', href: '#' },
    { label: 'For Investors', href: '#' },
    { label: 'Success Stories', href: '#' },
  ],
  features: [
    { label: 'Live Auctions', href: '#' },
    { label: 'Project Gallery', href: '#' },
    { label: 'Secure Messaging', href: '#' },
    { label: 'Verification', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Team', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
  ],
  resources: [
    { label: 'Blog', href: '#' },
    { label: 'Help Center', href: '#' },
    { label: 'Guidelines', href: '#' },
    { label: 'API Docs', href: '#' },
  ],
  legal: [
    { label: 'Terms of Service', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'GDPR', href: '#' },
  ],
};

export const LuxuryFooter: React.FC = () => {
  return (
    <footer className="bg-white text-[#1A1A1A] pt-20 pb-[30px] relative overflow-hidden">
      <div className="before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px]"
           style={{ background: 'var(--gold-shimmer)' }} />
      
      <div className="max-w-[1400px] mx-auto px-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-[60px]">
          <div>
            <h4 className="text-[14px] font-semibold mb-[25px] text-[#D4AF37] uppercase tracking-[1px]">
              Platform
            </h4>
            {footerLinks.platform.map((link) => (
              <Link 
                key={link.label}
                href={link.href}
                className="block text-[#666666] no-underline mb-3 text-[14px] hover:text-[#D4AF37] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div>
            <h4 className="text-[14px] font-semibold mb-[25px] text-[#D4AF37] uppercase tracking-[1px]">
              Features
            </h4>
            {footerLinks.features.map((link) => (
              <Link 
                key={link.label}
                href={link.href}
                className="block text-[#666666] no-underline mb-3 text-[14px] hover:text-[#D4AF37] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div>
            <h4 className="text-[14px] font-semibold mb-[25px] text-[#D4AF37] uppercase tracking-[1px]">
              Company
            </h4>
            {footerLinks.company.map((link) => (
              <Link 
                key={link.label}
                href={link.href}
                className="block text-[#666666] no-underline mb-3 text-[14px] hover:text-[#D4AF37] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div>
            <h4 className="text-[14px] font-semibold mb-[25px] text-[#D4AF37] uppercase tracking-[1px]">
              Resources
            </h4>
            {footerLinks.resources.map((link) => (
              <Link 
                key={link.label}
                href={link.href}
                className="block text-[#666666] no-underline mb-3 text-[14px] hover:text-[#D4AF37] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div>
            <h4 className="text-[14px] font-semibold mb-[25px] text-[#D4AF37] uppercase tracking-[1px]">
              Legal
            </h4>
            {footerLinks.legal.map((link) => (
              <Link 
                key={link.label}
                href={link.href}
                className="block text-[#666666] no-underline mb-3 text-[14px] hover:text-[#D4AF37] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="text-center pt-10 border-t border-[#E5E5E5] text-[#666666] text-[14px]">
          <p>© 2024 InventorX. All rights reserved. | Excellence in Innovation Investment</p>
        </div>
      </div>
    </footer>
  );
};