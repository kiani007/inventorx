export type ProposalType = 'PARTIAL' | 'TOTAL_BUYOUT' | 'ROYALTIES';

export interface ProposalOption {
  id: string;
  type: ProposalType;
  title: string;
  description: string;
  amount?: number;
  percentage?: number;
  terms: string[];
  isAvailable: boolean;
}

export interface Proposal {
  id: string;
  projectId: string;
  options: ProposalOption[];
  currency: string;
  negotiable: boolean;
  minimumInvestment?: number;
}

