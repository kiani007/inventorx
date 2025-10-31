'use client';

import React from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-[#F0F0F0] to-[#FAFAFA] py-20 px-4">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-[#E5C558]/5 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-[48px] font-light text-[#1A1A1A] mb-4">
            Welcome to{' '}
            <span className="font-semibold bg-gradient-to-r from-[#D4AF37] to-[#E5C558] bg-clip-text text-transparent">
              Your Dashboard
            </span>
          </h1>
          <p className="text-[18px] text-[#666666]">
            You&apos;re successfully logged in!
          </p>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-[800px] mx-auto">
          <div
            className="bg-white rounded-[40px] p-12"
            style={{ boxShadow: 'var(--neo-shadow-hover)' }}
          >
            <div className="text-center space-y-6">
              <div className="text-[64px]">🎉</div>
              <h2 className="text-[24px] font-semibold text-[#1A1A1A]">
                Login Successful!
              </h2>
              <p className="text-[16px] text-[#666666]">
                The dashboard interface will be implemented in the next phase.
                <br />
                For now, you can explore the marketplace or view your profile.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link
                  href="/marketplace"
                  className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#E5C558] text-white rounded-[20px] font-semibold hover:shadow-lg transition-all"
                >
                  Browse Marketplace
                </Link>
                <Link
                  href="/"
                  className="px-8 py-4 bg-white border-2 border-[#D4AF37] text-[#D4AF37] rounded-[20px] font-semibold hover:bg-[#D4AF37] hover:text-white transition-all"
                  style={{ boxShadow: 'var(--neo-shadow)' }}
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

