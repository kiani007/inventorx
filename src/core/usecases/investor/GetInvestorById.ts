/* stylelint-disable */
import { InvestorRepository } from '@/core/repositories/InvestorRepository';

export class GetInvestorByIdUseCase {
  constructor(private repo: InvestorRepository) {}

  async execute(id: string) {
    return this.repo.getById(id);
  }
}


