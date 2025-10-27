'use client';

import React from 'react';
import { MissionSection, VisionSection, TeamSection, PlatformConceptSection } from '@/presentation/organisms';
import { LuxuryHeader } from '@/presentation/organisms';
import { LuxuryFooter } from '@/presentation/organisms';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <LuxuryHeader />
      <div className="pt-32">
        <MissionSection />
        <VisionSection />
        <PlatformConceptSection />
        <TeamSection />
      </div>
      <LuxuryFooter />
    </div>
  );
};

