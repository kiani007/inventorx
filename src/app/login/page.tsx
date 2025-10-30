'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
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
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-[14px] text-[#666666] hover:text-[#D4AF37] transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-[48px] font-light text-[#1A1A1A] mb-4">
            Welcome Back to{' '}
            <span className="font-semibold bg-gradient-to-r from-[#D4AF37] to-[#E5C558] bg-clip-text text-transparent">
              InventorX
            </span>
          </h1>
          <p className="text-[18px] text-[#666666]">
            Login page coming soon!
          </p>
          <p className="text-[14px] text-[#999999] mt-2">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-[#D4AF37] hover:underline font-medium">
              Sign up here
            </Link>
          </p>
        </div>

        {/* Placeholder */}
        <div className="max-w-[600px] mx-auto">
          <div
            className="bg-white rounded-[40px] p-12 text-center"
            style={{ boxShadow: 'var(--neo-shadow-hover)' }}
          >
            <p className="text-[16px] text-[#666666]">
              The login flow will be implemented in Phase 2.
              <br />
              For now, you can create an account via the signup page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

