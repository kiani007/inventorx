import { ProjectRepository } from '../../repositories/ProjectRepository';
import { Project } from '../../domain/entities/Project';

export class GetProjectByIdUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(id: string): Promise<Project | null> {
    return await this.projectRepository.getById(id);
  }
}

