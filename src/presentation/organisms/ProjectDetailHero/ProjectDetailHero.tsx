'use client';

import React, { useState } from 'react';
import { cn } from '@/shared/utils/cn';
import { Project } from '@/core/domain/entities/Project';
import { isAuction } from '@/core/domain/entities/Auction';
import {
  Badge,
  Text,
  StatusIndicator,
  LikeButton,
  CountdownTimer,
  PriceDisplay,
} from '@/presentation/atoms';
import { InventorPreview } from '@/presentation/molecules';

export interface ProjectDetailHeroProps {
  project: Project;
  onLike?: (projectId: string, liked: boolean) => void;
  className?: string;
}

const ProjectDetailHero: React.FC<ProjectDetailHeroProps> = ({
  project,
  onLike,
  className,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLikeToggle = (liked: boolean) => {
    if (onLike) {
      onLike(project.id, liked);
    }
  };

  return (
    <section className={cn('py-12', className)}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div
              className="relative aspect-[4/3] rounded-[24px] overflow-hidden"
              style={{ boxShadow: 'var(--neo-shadow)' }}
            >
              <img
                src={project.images[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Image Navigation */}
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === 0 ? project.images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all"
                    style={{ boxShadow: 'var(--neo-shadow)' }}
                  >
                    <svg className="w-6 h-6 text-[#1A1A1A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === project.images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all"
                    style={{ boxShadow: 'var(--neo-shadow)' }}
                  >
                    <svg className="w-6 h-6 text-[#1A1A1A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Badges Overlay */}
              <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                {project.isFeatured && <Badge variant="featured">Featured</Badge>}
                {project.isNew && <Badge variant="new">New</Badge>}
                {project.isTrending && <Badge variant="trending">Trending</Badge>}
                {project.isValidated && <Badge variant="validated">Validated</Badge>}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {project.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      'flex-shrink-0 w-24 h-24 rounded-[12px] overflow-hidden transition-all',
                      currentImageIndex === index
                        ? 'ring-4 ring-[#D4AF37] scale-105'
                        : 'opacity-60 hover:opacity-100'
                    )}
                    style={{ boxShadow: 'var(--neo-shadow)' }}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Project Info */}
          <div className="space-y-6">
            {/* Status & Like */}
            <div className="flex items-center justify-between">
              <StatusIndicator status={project.status} />
              <LikeButton
                initialCount={project.likes}
                onToggle={handleLikeToggle}
                size="lg"
              />
            </div>

            {/* Title */}
            <div>
              <Text variant="h1" as="h1" className="text-4xl lg:text-5xl font-bold font-display mb-4">
                {project.title}
              </Text>
              <Text variant="body" className="text-lg text-[#666666] leading-relaxed">
                {project.shortDescription}
              </Text>
            </div>

            {/* Inventor */}
            <div
              className="p-6 rounded-[20px] bg-gradient-to-br from-[#FFF8F0] to-white"
              style={{ boxShadow: 'var(--neo-shadow)' }}
            >
              <Text variant="small" className="text-[#666666] uppercase tracking-wider font-semibold mb-3">
                Inventor
              </Text>
              <InventorPreview inventor={project.inventor} showStats size="lg" />
            </div>

            {/* Location & Category */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="p-6 rounded-[20px] bg-gradient-to-br from-[#FFF8F0] to-white"
                style={{ boxShadow: 'var(--neo-shadow)' }}
              >
                <Text variant="small" className="text-[#666666] uppercase tracking-wider font-semibold mb-2">
                  Location
                </Text>
                <Text variant="body" className="font-semibold text-[#1A1A1A]">
                  {project.location}
                </Text>
              </div>
              <div
                className="p-6 rounded-[20px] bg-gradient-to-br from-[#FFF8F0] to-white"
                style={{ boxShadow: 'var(--neo-shadow)' }}
              >
                <Text variant="small" className="text-[#666666] uppercase tracking-wider font-semibold mb-2">
                  Category
                </Text>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="default" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Auction Info or Price */}
            {isAuction(project) ? (
              <div
                className="p-8 rounded-[24px] bg-gradient-to-r from-[#E74C3C]/10 to-[#C0392B]/10 border-2 border-[#E74C3C]/30"
              >
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-6 h-6 text-[#E74C3C]" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <Text variant="h4" className="text-[#E74C3C] font-bold">
                    Live Auction
                  </Text>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <PriceDisplay
                      amount={project.currentBid || 0}
                      currency={project.proposal.currency}
                      label="Current Bid"
                      variant="large"
                    />
                  </div>
                  <div>
                    <Text variant="small" className="text-[#666666] uppercase tracking-wider font-semibold mb-2">
                      Total Bids
                    </Text>
                    <Text variant="h3" className="text-[#1A1A1A] font-bold font-display">
                      {project.totalBids}
                    </Text>
                  </div>
                </div>
                <CountdownTimer endDate={project.auctionEndDate!} />
              </div>
            ) : (
              <div
                className="p-8 rounded-[24px] bg-gradient-to-br from-[#FFF8F0] to-white"
                style={{ boxShadow: 'var(--neo-shadow)' }}
              >
                {project.proposal.options[0]?.amount && (
                  <PriceDisplay
                    amount={project.proposal.options[0].amount}
                    currency={project.proposal.currency}
                    label="Starting Investment"
                    variant="large"
                  />
                )}
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm text-[#666666]">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="font-semibold">{project.views.toLocaleString()}</span> views
              </div>
              <div>
                Posted {new Date(project.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ProjectDetailHero };

