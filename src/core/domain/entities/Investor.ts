/* stylelint-disable */
export interface InvestorSocials {
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface InvestmentRange {
  min: number;
  max: number;
  currency: string; // e.g., 'USD'
}

export interface Investor {
  id: string;
  name: string;
  avatar?: string;
  verified: boolean;
  country: string;
  city?: string;
  expertise: string[];
  categories: string[]; // align with ProjectCategory values if needed
  investmentRange: InvestmentRange;
  projectsCount: number;
  successRate: number; // 0..100
  lastActiveAt: Date;
  bio?: string;
  socials?: InvestorSocials;
}


