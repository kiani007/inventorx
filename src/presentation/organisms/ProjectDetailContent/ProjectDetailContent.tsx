'use client';

import React from 'react';
import { cn } from '@/shared/utils/cn';
import { Project } from '@/core/domain/entities/Project';
import { Text, Badge, Button } from '@/presentation/atoms';
import { ProposalSummary, AccessBlockOverlay } from '@/presentation/molecules';

export interface ProjectDetailContentProps {
  project: Project;
  isAuthenticated?: boolean;
  className?: string;
}

const ProjectDetailContent: React.FC<ProjectDetailContentProps> = ({
  project,
  isAuthenticated = false,
  className,
}) => {
  return (
    <section className={cn('py-12', className)}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div
              className="p-8 rounded-[24px] bg-gradient-to-br from-[#FFF8F0] to-white"
              style={{ boxShadow: 'var(--neo-shadow)' }}
            >
              <Text variant="h3" className="mb-6 font-display">
                Project Description
              </Text>
              <Text variant="body" className="text-[#666666] leading-relaxed whitespace-pre-line">
                {project.description}
              </Text>
            </div>

            {/* Technical Details - Blurred for visitors */}
            <div className="relative">
              {!isAuthenticated && (
                <div className="absolute inset-0 z-20">
                  <AccessBlockOverlay
                    title="Access Restricted"
                    message="Register or login to view detailed technical specifications and investment proposals"
                  />
                </div>
              )}
              <div
                className={cn(
                  'p-8 rounded-[24px] bg-gradient-to-br from-[#FFF8F0] to-white',
                  !isAuthenticated && 'filter blur-sm'
                )}
                style={{ boxShadow: 'var(--neo-shadow)' }}
              >
                <Text variant="h3" className="mb-6 font-display">
                  Technical Specifications
                </Text>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-[16px] bg-white">
                      <Text variant="small" className="text-[#666666] uppercase tracking-wider font-semibold mb-1">
                        Patent Status
                      </Text>
                      <Text variant="body" className="font-semibold text-[#1A1A1A]">
                        {project.isValidated ? 'Patent Pending' : 'In Review'}
                      </Text>
                    </div>
                    <div className="p-4 rounded-[16px] bg-white">
                      <Text variant="small" className="text-[#666666] uppercase tracking-wider font-semibold mb-1">
                        Development Stage
                      </Text>
                      <Text variant="body" className="font-semibold text-[#1A1A1A]">
                        Prototype Ready
                      </Text>
                    </div>
                  </div>
                  <Text variant="body" className="text-[#666666] leading-relaxed">
                    Detailed technical documentation including engineering specifications,
                    materials analysis, performance metrics, and testing results are available
                    to registered investors.
                  </Text>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div
              className="p-8 rounded-[24px] bg-gradient-to-br from-[#FFF8F0] to-white"
              style={{ boxShadow: 'var(--neo-shadow)' }}
            >
              <Text variant="h3" className="mb-6 font-display">
                Available Documents
              </Text>
              <div className="space-y-3">
                {project.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 rounded-[16px] bg-white border-2 border-gray-200 hover:border-[#D4AF37]/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-[12px] bg-[#D4AF37]/10 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-[#D4AF37]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <Text variant="body" className="font-semibold text-[#1A1A1A]">
                          {doc.title}
                        </Text>
                        <Text variant="small" className="text-[#666666]">
                          {doc.type.replace(/_/g, ' ')}
                        </Text>
                      </div>
                    </div>
                    {doc.requiresAuth && !isAuthenticated ? (
                      <Badge variant="default" size="sm">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Login Required
                      </Badge>
                    ) : (
                      <Button variant="secondary" size="sm">
                        Download
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Investment Proposals */}
            <div className="relative">
              {!isAuthenticated && (
                <div className="absolute inset-0 z-20">
                  <AccessBlockOverlay
                    title="Investment Details"
                    message="View full investment opportunities and proposal details"
                  />
                </div>
              )}
              <ProposalSummary proposal={project.proposal} blurred={!isAuthenticated} />
            </div>

            {/* CTA Button */}
            {!isAuthenticated ? (
              <Button variant="primary" size="full">
                Register to Invest
              </Button>
            ) : (
              <Button variant="primary" size="full">
                Contact Inventor
              </Button>
            )}

            {/* Key Facts */}
            <div
              className="p-6 rounded-[20px] bg-gradient-to-br from-[#FFF8F0] to-white"
              style={{ boxShadow: 'var(--neo-shadow)' }}
            >
              <Text variant="h4" className="mb-4 font-display">
                Key Facts
              </Text>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <Text variant="small" className="text-[#666666]">
                    Project ID
                  </Text>
                  <Text variant="small" className="font-semibold text-[#1A1A1A]">
                    {project.id.toUpperCase()}
                  </Text>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <Text variant="small" className="text-[#666666]">
                    Status
                  </Text>
                  <Badge variant={
                    project.status === 'AVAILABLE' ? 'available' :
                    project.status === 'IN_AUCTION' ? 'inAuction' :
                    project.status === 'IN_NEGOTIATION' ? 'inNegotiation' : 'sold'
                  } size="sm">
                    {project.status.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <Text variant="small" className="text-[#666666]">
                    Category
                  </Text>
                  <Text variant="small" className="font-semibold text-[#1A1A1A]">
                    {project.tags[0]}
                  </Text>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <Text variant="small" className="text-[#666666]">
                    Listed
                  </Text>
                  <Text variant="small" className="font-semibold text-[#1A1A1A]">
                    {new Date(project.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text variant="small" className="text-[#666666]">
                    Negotiable
                  </Text>
                  <Text variant="small" className="font-semibold text-[#27AE60]">
                    {project.proposal.negotiable ? 'Yes' : 'No'}
                  </Text>
                </div>
              </div>
            </div>

            {/* Share */}
            <div
              className="p-6 rounded-[20px] bg-gradient-to-br from-[#FFF8F0] to-white"
              style={{ boxShadow: 'var(--neo-shadow)' }}
            >
              <Text variant="h4" className="mb-4 font-display">
                Share Project
              </Text>
              <div className="flex gap-3">
                {['twitter', 'linkedin', 'facebook', 'email'].map((platform) => (
                  <button
                    key={platform}
                    className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all flex items-center justify-center"
                    style={{ boxShadow: 'var(--neo-shadow)' }}
                    title={`Share on ${platform}`}
                  >
                    <svg className="w-5 h-5 text-[#666666]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ProjectDetailContent };

