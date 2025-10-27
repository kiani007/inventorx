'use client';

import React from 'react';
import { ContactFormSection, SocialLinksSection } from '@/presentation/organisms';
import { LuxuryHeader } from '@/presentation/organisms';
import { LuxuryFooter } from '@/presentation/organisms';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <LuxuryHeader />
      <div className="pt-32">
        <ContactFormSection />
        <SocialLinksSection />
      </div>
      <LuxuryFooter />
    </div>
  );
};

