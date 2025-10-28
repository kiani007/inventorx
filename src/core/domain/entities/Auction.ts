import { Project } from './Project';

export interface AuctionBid {
  id: string;
  auctionId: string;
  bidderId: string;
  bidderName: string;
  amount: number;
  timestamp: Date;
}

export interface Auction extends Project {
  isAuction: true;
  auctionEndDate: Date;
  auctionStartDate: Date;
  currentBid: number;
  startingBid: number;
  totalBids: number;
  minimumBidIncrement: number;
  bids: AuctionBid[];
  autoExtend: boolean; // Extends if bid placed in last minutes
  reservePrice?: number;
  buyNowPrice?: number;
}

export const isAuction = (project: Project): project is Auction => {
  return project.isAuction === true;
};

export const getTimeRemaining = (endDate: Date): { days: number; hours: number; minutes: number; seconds: number; isExpired: boolean } => {
  const now = new Date().getTime();
  const end = new Date(endDate).getTime();
  const distance = end - now;

  if (distance < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
    isExpired: false,
  };
};

