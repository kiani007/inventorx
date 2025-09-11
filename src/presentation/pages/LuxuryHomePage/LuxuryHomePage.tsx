'use client';

import React from 'react';
import {
  LuxuryHeader,
  HeroSection,
  CarouselSection,
  ProcessSection,
  StatsSection,
  BlogSection,
  ProjectsSection,
  TestimonialsSection,
  PartnersSection,
  CTASection,
  LuxuryFooter,
} from '@/presentation/organisms';

export const LuxuryHomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <LuxuryHeader />
      <HeroSection />
      <PartnersSection />
      <CarouselSection />
      <ProcessSection />
      <StatsSection />
      <BlogSection />
      <ProjectsSection />
      <TestimonialsSection />
      <CTASection />
      <LuxuryFooter />
    </div>
  );
};