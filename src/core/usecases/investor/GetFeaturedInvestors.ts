/* stylelint-disable */
import { InvestorRepository } from '@/core/repositories/InvestorRepository';

export class GetFeaturedInvestorsUseCase {
  constructor(private repo: InvestorRepository) {}

  async execute(limit = 8) {
    return this.repo.getFeatured(limit);
  }
}


