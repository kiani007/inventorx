import { Inventor } from './Inventor';
import { Proposal } from './Proposal';

export type ProjectStatus = 'AVAILABLE' | 'IN_AUCTION' | 'IN_NEGOTIATION' | 'SOLD';
export type ProjectCategory = 'MEDICAL_TECH' | 'GREEN_ENERGY' | 'AI_ML' | 'BIOTECH' | 'ROBOTICS' | 'SPACE_TECH' | 'FINTECH' | 'EDTECH';

export interface ProjectDocument {
  id: string;
  title: string;
  type: 'TECHNICAL_BRIEF' | 'PRESENTATION' | 'PATENT' | 'PROTOTYPE_VIDEO';
  url: string;
  requiresAuth: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: ProjectCategory;
  status: ProjectStatus;
  inventor: Inventor;
  images: string[];
  thumbnailImage: string;
  location: string;
  country: string;
  tags: string[];
  likes: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  
  // Investment details
  proposal: Proposal;
  
  // Documents
  documents: ProjectDocument[];
  
  // Auction specific (optional)
  isAuction: boolean;
  auctionEndDate?: Date;
  currentBid?: number;
  startingBid?: number;
  totalBids?: number;
  
  // Validation
  isValidated: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isTrending: boolean;
}

export const PROJECT_CATEGORIES: Record<ProjectCategory, string> = {
  MEDICAL_TECH: 'Medical Technology',
  GREEN_ENERGY: 'Green Energy',
  AI_ML: 'AI & Machine Learning',
  BIOTECH: 'Biotechnology',
  ROBOTICS: 'Robotics',
  SPACE_TECH: 'Space Technology',
  FINTECH: 'Financial Technology',
  EDTECH: 'Educational Technology',
};

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  AVAILABLE: 'Available',
  IN_AUCTION: 'Live Auction',
  IN_NEGOTIATION: 'In Negotiation',
  SOLD: 'Sold',
};

