/* stylelint-disable */
import { InvestorRepository } from '@/core/repositories/InvestorRepository';

export class SearchInvestorsUseCase {
  constructor(private repo: InvestorRepository) {}

  async execute(query: string, page = 1, pageSize = 12) {
    return this.repo.search(query, page, pageSize);
  }
}


