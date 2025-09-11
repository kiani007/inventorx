import React from 'react';
import { cn } from '@/shared/utils/cn';
import { Text } from '@/presentation/atoms';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  sections?: FooterSection[];
  copyright?: string;
  socialLinks?: Array<{ icon: React.ReactNode; href: string; label: string }>;
}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      className,
      sections = [],
      copyright = `© ${new Date().getFullYear()} InventorX. All rights reserved.`,
      socialLinks = [],
      ...props
    },
    ref
  ) => {
    return (
      <footer
        ref={ref}
        className={cn('bg-gray-50 border-t border-gray-200', className)}
        {...props}
      >
        <div className="container mx-auto px-4 py-12">
          {/* Footer Sections */}
          {sections.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              {sections.map((section) => (
                <div key={section.title}>
                  <Text variant="h4" className="mb-4">
                    {section.title}
                  </Text>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Section */}
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <Text variant="small" color="secondary">
              {copyright}
            </Text>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex space-x-4 mt-4 md:mt-0">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </footer>
    );
  }
);

Footer.displayName = 'Footer';

export { Footer };