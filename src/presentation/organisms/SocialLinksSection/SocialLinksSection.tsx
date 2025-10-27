'use client';

import React from 'react';
import { cn } from '@/shared/utils/cn';
import { 
  Linkedin, 
  Twitter, 
  Github, 
  Instagram, 
  Youtube, 
  Facebook,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const socialLinks = [
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com',
    color: '#0077B5',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    url: 'https://twitter.com',
    color: '#1DA1F2',
  },
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com',
    color: '#333333',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://instagram.com',
    color: '#E4405F',
  },
  {
    name: 'YouTube',
    icon: Youtube,
    url: 'https://youtube.com',
    color: '#FF0000',
  },
  {
    name: 'Facebook',
    icon: Facebook,
    url: 'https://facebook.com',
    color: '#1877F2',
  },
];

export const SocialLinksSection: React.FC = () => {
  return (
    <section className="py-[80px] bg-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-10 w-[300px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-[#E5C558]/5 rounded-full blur-[100px] animate-pulse" 
             style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-[1200px] mx-auto px-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className={cn(
            "text-[42px] font-extralight mb-5 text-[#1A1A1A]"
          )}>
            Follow Us on
            <span className="font-normal bg-gradient-to-r from-[#D4AF37] to-[#E5C558] bg-clip-text text-transparent"> Social Media</span>
          </h2>
          <p className="text-[16px] text-[#666666]">
            Stay connected and get the latest updates
          </p>
        </div>

        {/* Social Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group relative bg-white rounded-[20px] p-6 text-center transition-all duration-300 cursor-pointer",
                  "hover:-translate-y-2 hover:scale-105"
                )}
                style={{ boxShadow: 'var(--neo-shadow)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 20px 40px -10px ${social.color}30, 0 10px 30px -10px rgba(0,0,0,0.1)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--neo-shadow)';
                }}
              >
                {/* Icon with Background */}
                <div className="w-14 h-14 mx-auto mb-4 rounded-[15px] flex items-center justify-center bg-gradient-to-br from-[#FFF8F0] to-white group-hover:scale-110 transition-transform duration-500"
                     style={{ boxShadow: `0 10px 25px -8px ${social.color}20` }}>
                  <IconComponent 
                    size={24} 
                    className="text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors" 
                    style={{ color: social.color }}
                  />
                </div>
                
                <h3 className="text-[13px] font-semibold text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors">
                  {social.name}
                </h3>
              </a>
            );
          })}
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-[#FFF8F0] to-white rounded-[25px] p-8 text-center group hover:-translate-y-2 transition-all duration-300"
               style={{ boxShadow: 'var(--neo-shadow)' }}>
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E5C558] flex items-center justify-center shadow-[0_10px_30px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-2">Email</h3>
            <p className="text-[14px] text-[#666666]">contact@inventorx.com</p>
          </div>

          <div className="bg-gradient-to-br from-[#FFF8F0] to-white rounded-[25px] p-8 text-center group hover:-translate-y-2 transition-all duration-300"
               style={{ boxShadow: 'var(--neo-shadow)' }}>
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E5C558] flex items-center justify-center shadow-[0_10px_30px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-transform">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-2">Phone</h3>
            <p className="text-[14px] text-[#666666]">+1 (555) 123-4567</p>
          </div>

          <div className="bg-gradient-to-br from-[#FFF8F0] to-white rounded-[25px] p-8 text-center group hover:-translate-y-2 transition-all duration-300"
               style={{ boxShadow: 'var(--neo-shadow)' }}>
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E5C558] flex items-center justify-center shadow-[0_10px_30px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-transform">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-2">Office</h3>
            <p className="text-[14px] text-[#666666]">123 Innovation Street</p>
          </div>
        </div>
      </div>
    </section>
  );
};
