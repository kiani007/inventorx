'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/shared/utils/cn';
import { Project } from '@/core/domain/entities/Project';
import { isAuction } from '@/core/domain/entities/Auction';
import {
  Badge,
  Avatar,
  StatusIndicator,
  LikeButton,
  PriceDisplay,
  CountdownTimer,
} from '@/presentation/atoms';

export interface ProjectCardProps {
  project: Project;
  className?: string;
  onLike?: (projectId: string, liked: boolean) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  className,
  onLike,
}) => {
  const handleLikeToggle = (liked: boolean) => {
    if (onLike) {
      onLike(project.id, liked);
    }
  };

  const mainProposalOption = project.proposal.options[0];

  return (
    <Link href={`/marketplace/${project.id}`}>
      <div
        className={cn(
          'group relative flex flex-col h-full rounded-[24px] bg-gradient-to-br from-[#FFF8F0] to-white overflow-hidden',
          'transition-all duration-500 ease-out cursor-pointer',
          'hover:-translate-y-3 hover:scale-[1.02]',
          className
        )}
        style={{ boxShadow: 'var(--neo-shadow)' }}
      >
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={project.thumbnailImage}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              {project.isFeatured && (
                <Badge variant="featured" size="sm">
                  Featured
                </Badge>
              )}
              {project.isNew && (
                <Badge variant="new" size="sm">
                  New
                </Badge>
              )}
              {project.isTrending && (
                <Badge variant="trending" size="sm">
                  Trending
                </Badge>
              )}
              {project.isValidated && (
                <Badge variant="validated" size="sm">
                  Validated
                </Badge>
              )}
            </div>
            
            {/* Like Button */}
            <div
              className="z-10"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <LikeButton
                initialCount={project.likes}
                onToggle={handleLikeToggle}
                size="sm"
              />
            </div>
          </div>

          {/* Bottom Status */}
          <div className="absolute bottom-4 left-4 right-4">
            <StatusIndicator status={project.status} size="sm" />
          </div>
        </div>

        {/* Content Container */}
        <div className="flex-1 flex flex-col p-6">
          {/* Title & Description */}
          <div className="mb-4">
            <h3 className="text-xl font-bold font-display text-[#1A1A1A] mb-2 line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-[#666666] line-clamp-2">
              {project.shortDescription}
            </p>
          </div>

          {/* Category & Location */}
          <div className="flex items-center gap-3 mb-4 text-xs">
            <div className="flex items-center gap-1.5 text-[#999999]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span>{project.tags[0]}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#999999]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{project.country}</span>
            </div>
          </div>

          {/* Inventor Info */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Avatar
                src={project.inventor.avatar}
                alt={project.inventor.name}
                fallback={project.inventor.name}
                size="sm"
                verified={project.inventor.verified}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#1A1A1A] truncate">
                  {project.inventor.name}
                </p>
                <p className="text-xs text-[#999999]">{project.inventor.country}</p>
              </div>
            </div>
          </div>

          {/* Auction Countdown or Price */}
          {isAuction(project) ? (
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-[#666666] uppercase tracking-wider font-semibold">
                  Current Bid
                </span>
                <PriceDisplay
                  amount={project.currentBid || 0}
                  currency={project.proposal.currency}
                  variant="compact"
                />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#999999]">
                  {project.totalBids} bid{project.totalBids !== 1 ? 's' : ''}
                </span>
                <CountdownTimer endDate={project.auctionEndDate!} compact />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {mainProposalOption?.amount && (
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-[#666666] uppercase tracking-wider font-semibold">
                    Starting From
                  </span>
                  <PriceDisplay
                    amount={mainProposalOption.amount}
                    currency={project.proposal.currency}
                    variant="compact"
                  />
                </div>
              )}
              <div className="flex flex-wrap gap-1.5">
                {project.proposal.options.slice(0, 2).map((option) => (
                  <Badge key={option.id} variant="default" size="sm">
                    {option.type.replace('_', ' ')}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Stats Footer */}
          <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-[#999999]">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{project.views.toLocaleString()} views</span>
            </div>
            <div className="text-[#999999]">
              {new Date(project.updatedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export { ProjectCard };

