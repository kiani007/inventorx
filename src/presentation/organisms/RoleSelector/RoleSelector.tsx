'use client';

import React from 'react';
import { UserRole } from '@/core/domain/entities/AuthUser';
import { RoleCard } from '@/presentation/molecules/RoleCard/RoleCard';
import { Lightbulb, Rocket, TrendingUp } from 'lucide-react';

export interface RoleSelectorProps {
  selectedRole: UserRole | null;
  onRoleSelect: (role: UserRole) => void;
}

const roles = [
  {
    role: UserRole.INVENTOR,
    title: 'Inventor',
    description: 'I create and develop innovative products and solutions',
    icon: Lightbulb,
  },
  {
    role: UserRole.CONCEPTOR,
    title: 'Conceptor',
    description: 'I have ideas and concepts that need development',
    icon: Rocket,
  },
  {
    role: UserRole.INVESTOR,
    title: 'Investor',
    description: 'I invest in promising inventions and innovations',
    icon: TrendingUp,
  },
];

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  selectedRole,
  onRoleSelect,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-block px-5 py-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-[13px] font-semibold uppercase tracking-[1px]">
          Step 1
        </div>
        <h2 className="text-[32px] font-light text-[#1A1A1A]">
          Choose Your <span className="font-semibold bg-gradient-to-r from-[#D4AF37] to-[#E5C558] bg-clip-text text-transparent">Role</span>
        </h2>
        <p className="text-[16px] text-[#666666] max-w-[600px] mx-auto">
          Select the role that best describes you to customize your experience
        </p>
      </div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((roleData) => (
          <RoleCard
            key={roleData.role}
            role={roleData.role}
            title={roleData.title}
            description={roleData.description}
            icon={roleData.icon}
            selected={selectedRole === roleData.role}
            onClick={() => onRoleSelect(roleData.role)}
          />
        ))}
      </div>
    </div>
  );
};

