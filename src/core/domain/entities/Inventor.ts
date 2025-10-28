export interface Inventor {
  id: string;
  name: string;
  email: string;
  country: string;
  avatar?: string;
  bio?: string;
  expertise?: string[];
  verified: boolean;
  projectsCount: number;
  successRate: number; // percentage
}

