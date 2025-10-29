/* stylelint-disable */
import { InvestorRepository, InvestorFilters } from '@/core/repositories/InvestorRepository';

export class GetInvestorsUseCase {
  constructor(private repo: InvestorRepository) {}

  async execute(filters: InvestorFilters) {
    return this.repo.getAll(filters);
  }
}


