'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/shared/utils/cn';
import { Tag } from '@/presentation/molecules';

const teamMembers = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    role: 'CEO & Co-Founder',
    bio: 'Serial entrepreneur with 15+ years in venture capital and deep tech investments',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150',
    location: 'Berlin, Germany',
    expertise: ['Medical Tech', 'Biotech', 'VC'],
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CTO & Co-Founder',
    bio: 'Former tech lead at Google, passionate about bridging innovation and technology',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    location: 'San Francisco, USA',
    expertise: ['AI/ML', 'Platform', 'Tech Strategy'],
  },
  {
    id: 3,
    name: 'Dr. Emma Watson',
    role: 'Chief Innovation Officer',
    bio: 'PhD in Engineering, helped launch 50+ innovations to market',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    location: 'London, UK',
    expertise: ['Validation', 'R&D', 'IP'],
  },
  {
    id: 4,
    name: 'Alexandre Laurent',
    role: 'Head of Investor Relations',
    bio: 'Connects the world&apos;s best innovators with elite investors and VCs',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    location: 'Lyon, France',
    expertise: ['Investment', 'Network', 'Strategy'],
  },
  {
    id: 5,
    name: 'Sofia Martinez',
    role: 'VP of Product',
    bio: 'Designer turned entrepreneur, obsessed with user experience and platform excellence',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    location: 'Barcelona, Spain',
    expertise: ['UX/UI', 'Product', 'Design'],
  },
  {
    id: 6,
    name: 'Dr. Marie Laurent',
    role: 'Head of Platform Operations',
    bio: 'Expert in scaling platforms and managing complex technical ecosystems',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    location: 'Paris, France',
    expertise: ['Operations', 'Scale', 'Tech'],
  },
];

export const TeamSection: React.FC = () => {
  return (
    <section className="py-[120px] bg-gradient-to-br from-[#FAFAFA] via-white to-[#FFF8F0] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 left-10 w-[350px] h-[350px] bg-[#E5C558]/5 rounded-full blur-[100px] animate-pulse" 
             style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-5 py-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-[13px] font-semibold uppercase tracking-[1px] mb-6">
            Our Team
          </div>
          
          <h2 className={cn(
            "text-[56px] font-extralight mb-8 text-[#1A1A1A]"
          )}>
            Meet the
            <span className="font-normal bg-gradient-to-r from-[#D4AF37] to-[#E5C558] bg-clip-text text-transparent"> Experts</span>
          </h2>
          
          <p className="text-[20px] text-[#666666] max-w-[700px] mx-auto">
            A diverse team of visionaries, technologists, and entrepreneurs dedicated to transforming 
            how innovation meets investment.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member) => (
            <div 
              key={member.id}
              className={cn(
                "group bg-white rounded-[35px] p-10 relative transition-all duration-500",
                "hover:-translate-y-[10px] hover:scale-[1.02]"
              )}
              style={{ boxShadow: 'var(--neo-shadow)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--neo-shadow-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--neo-shadow)';
              }}
            >
              {/* Avatar */}
              <div className="relative mb-6">
                <div className="w-[140px] h-[140px] mx-auto rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E5C558] p-1 shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
                  <div className="w-full h-full rounded-full bg-white p-1 relative">
                    <Image 
                      src={member.avatar} 
                      alt={member.name}
                      fill
                      className="rounded-full object-cover"
                      sizes="140px"
                    />
                  </div>
                </div>
                
                {/* Online Indicator */}
                <div className="absolute bottom-2 right-1/2 translate-x-[50px] w-5 h-5 bg-[#27AE60] rounded-full border-4 border-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]" />
              </div>

              {/* Info */}
              <h3 className="text-[22px] font-semibold text-[#1A1A1A] mb-2 text-center">
                {member.name}
              </h3>
              
              <p className="text-[15px] text-[#D4AF37] font-medium text-center mb-2 uppercase tracking-[0.5px]">
                {member.role}
              </p>
              
              <p className="text-[14px] text-[#666666] text-center mb-2">
                📍 {member.location}
              </p>
              
              <p className="text-[14px] text-[#666666] leading-relaxed mb-6 text-center">
                {member.bio}
              </p>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-2 justify-center">
                {member.expertise.map((skill, skillIndex) => (
                  <Tag key={skillIndex} label={skill} variant="gold" size="sm" />
                ))}
              </div>

              {/* Gold Accent Bar on Hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Join Us CTA */}
        <div className="text-center mt-20">
          <div className="bg-white rounded-[35px] p-12 inline-block"
               style={{ boxShadow: 'var(--neo-shadow)' }}>
            <h3 className="text-[28px] font-light text-[#1A1A1A] mb-4">
              Want to join our team?
            </h3>
            <p className="text-[16px] text-[#666666] mb-8">
              We&apos;re always looking for passionate individuals to help shape the future of innovation
            </p>
            <button className={cn(
              "px-12 py-4 bg-gradient-to-r from-[#D4AF37] to-[#E5C558] text-white rounded-full",
              "text-[15px] font-semibold uppercase tracking-[1px]",
              "shadow-[0_20px_40px_-10px_rgba(212,175,55,0.4)]",
              "hover:shadow-[0_25px_50px_-10px_rgba(212,175,55,0.5)]",
              "hover:-translate-y-1 transition-all duration-300"
            )}>
              View Open Positions
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

