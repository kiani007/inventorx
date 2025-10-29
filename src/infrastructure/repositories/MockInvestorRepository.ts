/* stylelint-disable */
import { Investor } from '@/core/domain/entities/Investor';
import { InvestorRepository, InvestorFilters } from '@/core/repositories/InvestorRepository';

const names = [
  'Ava Mitchell', 'Liam Carter', 'Sophia Nguyen', 'Noah Patel', 'Isabella Rossi', 'Ethan Kim', 'Mia Lopez', 'Lucas Wang',
  'Charlotte Brown', 'James Wilson', 'Amelia Davis', 'Benjamin Clark', 'Harper Lewis', 'Elijah Walker', 'Evelyn Hall', 'Michael Young',
];

const countries = ['United States', 'United Kingdom', 'Canada', 'United Arab Emirates', 'Spain', 'Japan', 'Germany', 'France'];
const categories = ['AI_ML', 'MEDICAL_TECH', 'GREEN_ENERGY', 'FINTECH', 'BIOTECH', 'SPACE_TECH', 'EDTECH', 'ROBOTICS'];

function randomItem<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

function generateMockInvestors(count = 40): Investor[] {
  const list: Investor[] = [];
  for (let i = 0; i < count; i++) {
    const min = Math.floor(Math.random() * 2_000_000) + 100_000;
    const max = min + Math.floor(Math.random() * 10_000_000) + 500_000;
    const country = randomItem(countries);
    list.push({
      id: `inv-${i + 1}`,
      name: names[i % names.length],
      avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
      verified: Math.random() > 0.4,
      country,
      city: '—',
      expertise: ['AI', 'Healthcare', 'SaaS', 'Climate'].slice(0, (i % 3) + 1),
      categories: [randomItem(categories), randomItem(categories)].slice(0, (i % 2) + 1),
      investmentRange: { min, max, currency: 'USD' },
      projectsCount: Math.floor(Math.random() * 40) + 1,
      successRate: Math.floor(Math.random() * 50) + 50,
      lastActiveAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000),
      bio: 'Early-stage investor focused on defensible tech and strong teams.',
      socials: { linkedin: '#', website: '#' },
    });
  }
  return list;
}

export class MockInvestorRepository implements InvestorRepository {
  private investors: Investor[] = generateMockInvestors();

  async getAll(filters: InvestorFilters = {}) {
    let items = [...this.investors];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      items = items.filter((i) => i.name.toLowerCase().includes(q) || i.expertise.some((t) => t.toLowerCase().includes(q)));
    }
    if (filters.category) {
      items = items.filter((i) => i.categories.includes(filters.category!));
    }
    if (filters.country) {
      const c = filters.country.toLowerCase();
      items = items.filter((i) => i.country.toLowerCase().includes(c));
    }
    if (typeof filters.verified === 'boolean') {
      items = items.filter((i) => i.verified === filters.verified);
    }
    if (filters.min !== undefined) {
      items = items.filter((i) => i.investmentRange.max >= (filters.min as number));
    }
    if (filters.max !== undefined) {
      items = items.filter((i) => i.investmentRange.min <= (filters.max as number));
    }

    // Sorting
    const sortBy = filters.sort ?? 'MOST_ACTIVE';
    items.sort((a, b) => {
      if (a.verified && !b.verified) return -1;
      if (!a.verified && b.verified) return 1;
      if (sortBy === 'MOST_PROJECTS') return b.projectsCount - a.projectsCount;
      if (sortBy === 'HIGHEST_SUCCESS') return b.successRate - a.successRate;
      // MOST_ACTIVE
      return b.lastActiveAt.getTime() - a.lastActiveAt.getTime();
    });

    // Pagination
    const page = Math.max(1, filters.page || 1);
    const pageSize = Math.max(1, filters.pageSize || 12);
    const start = (page - 1) * pageSize;
    const paged = items.slice(start, start + pageSize);
    return { items: paged, total: items.length };
  }

  async getById(id: string) {
    return this.investors.find((i) => i.id === id) ?? null;
  }

  async search(query: string, page = 1, pageSize = 12) {
    return this.getAll({ search: query, page, pageSize });
  }

  async getFeatured(limit = 8) {
    return [...this.investors]
      .filter((i) => i.verified)
      .sort((a, b) => b.successRate - a.successRate)
      .slice(0, limit);
  }
}


