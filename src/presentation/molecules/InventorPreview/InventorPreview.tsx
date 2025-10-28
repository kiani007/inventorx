import React from 'react';
import { cn } from '@/shared/utils/cn';
import { Avatar, Badge } from '@/presentation/atoms';
import { Inventor } from '@/core/domain/entities/Inventor';

export interface InventorPreviewProps {
  inventor: Inventor;
  className?: string;
  showStats?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const InventorPreview: React.FC<InventorPreviewProps> = ({
  inventor,
  className,
  showStats = false,
  size = 'md',
}) => {
  const sizeConfig = {
    sm: {
      avatar: 'sm' as const,
      nameText: 'text-sm',
      subText: 'text-xs',
      gap: 'gap-2',
    },
    md: {
      avatar: 'md' as const,
      nameText: 'text-base',
      subText: 'text-sm',
      gap: 'gap-3',
    },
    lg: {
      avatar: 'lg' as const,
      nameText: 'text-lg',
      subText: 'text-base',
      gap: 'gap-4',
    },
  };

  const config = sizeConfig[size];

  return (
    <div className={cn('flex items-center', config.gap, className)}>
      <Avatar
        src={inventor.avatar}
        alt={inventor.name}
        fallback={inventor.name}
        size={config.avatar}
        variant={inventor.verified ? 'verified' : 'default'}
        verified={inventor.verified}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className={cn(config.nameText, 'font-semibold text-[#1A1A1A] truncate')}>
            {inventor.name}
          </h4>
          {inventor.verified && size !== 'sm' && (
            <Badge variant="validated" size="sm">
              Verified
            </Badge>
          )}
        </div>
        <p className={cn(config.subText, 'text-[#666666] truncate')}>
          {inventor.country}
        </p>
        {showStats && size !== 'sm' && (
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-[#999999]">
              <span className="font-semibold text-[#D4AF37]">{inventor.projectsCount}</span> projects
            </span>
            <span className="text-xs text-[#999999]">
              <span className="font-semibold text-[#27AE60]">{inventor.successRate}%</span> success
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export { InventorPreview };

