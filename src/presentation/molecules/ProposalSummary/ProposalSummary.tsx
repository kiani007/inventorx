import React from 'react';
import { cn } from '@/shared/utils/cn';
import { Proposal, ProposalType } from '@/core/domain/entities/Proposal';
import { Badge, PriceDisplay } from '@/presentation/atoms';

export interface ProposalSummaryProps {
  proposal: Proposal;
  className?: string;
  blurred?: boolean;
  compact?: boolean;
}

const proposalTypeLabels: Record<ProposalType, string> = {
  PARTIAL: 'Partial Investment',
  TOTAL_BUYOUT: 'Total Buyout',
  ROYALTIES: 'Royalty Agreement',
};

const ProposalSummary: React.FC<ProposalSummaryProps> = ({
  proposal,
  className,
  blurred = false,
  compact = false,
}) => {
  const mainOption = proposal.options[0];
  
  if (!mainOption) return null;

  if (compact) {
    return (
      <div className={cn('space-y-2', blurred && 'filter blur-sm pointer-events-none', className)}>
        <div className="flex items-center gap-2 flex-wrap">
          {proposal.options.slice(0, 2).map((option) => (
            <Badge key={option.id} variant="default" size="sm">
              {proposalTypeLabels[option.type]}
            </Badge>
          ))}
          {proposal.options.length > 2 && (
            <Badge variant="default" size="sm">
              +{proposal.options.length - 2} more
            </Badge>
          )}
        </div>
        {mainOption.amount && (
          <PriceDisplay
            amount={mainOption.amount}
            currency={proposal.currency}
            variant="compact"
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'space-y-4 p-6 rounded-[20px] bg-gradient-to-br from-[#FFF8F0] to-white',
        blurred && 'filter blur-md pointer-events-none',
        className
      )}
      style={{ boxShadow: 'var(--neo-shadow)' }}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-[#1A1A1A] font-display">
          Investment Options
        </h4>
        {proposal.negotiable && (
          <Badge variant="default" size="sm">
            Negotiable
          </Badge>
        )}
      </div>

      <div className="space-y-3">
        {proposal.options.map((option) => (
          <div
            key={option.id}
            className={cn(
              'p-4 rounded-[16px] border-2 transition-all duration-300',
              option.isAvailable
                ? 'border-[#D4AF37]/30 bg-white hover:border-[#D4AF37] cursor-pointer'
                : 'border-gray-200 bg-gray-50 opacity-60'
            )}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h5 className="font-semibold text-[#1A1A1A] mb-1">
                  {option.title}
                </h5>
                <p className="text-sm text-[#666666]">{option.description}</p>
              </div>
              {option.amount && (
                <PriceDisplay
                  amount={option.amount}
                  currency={proposal.currency}
                  variant="compact"
                />
              )}
            </div>
            {option.percentage && (
              <div className="text-sm font-semibold text-[#D4AF37] mb-2">
                {option.percentage}% {option.type === 'PARTIAL' ? 'Equity' : 'Royalty'}
              </div>
            )}
            <ul className="space-y-1">
              {option.terms.slice(0, 3).map((term, index) => (
                <li key={index} className="text-xs text-[#666666] flex items-start gap-2">
                  <span className="text-[#D4AF37] mt-0.5">✓</span>
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {proposal.minimumInvestment && (
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-[#666666]">
            Minimum Investment:{' '}
            <span className="font-semibold text-[#1A1A1A]">
              {proposal.currency} {proposal.minimumInvestment.toLocaleString()}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export { ProposalSummary };

