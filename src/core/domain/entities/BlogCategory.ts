export interface BlogCategory {
  id: string;
  title: string;
  slug: string;
  description?: string;
}

export const BLOG_CATEGORIES = {
  INNOVATION: 'Innovation',
  TECHNOLOGY: 'Technology',
  INVESTMENT: 'Investment',
  ENTREPRENEURSHIP: 'Entrepreneurship',
  RESEARCH: 'Research & Development',
  SUCCESS_STORIES: 'Success Stories',
  INDUSTRY_INSIGHTS: 'Industry Insights',
  LEGAL: 'Legal & IP',
} as const;

