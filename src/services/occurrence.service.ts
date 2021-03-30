import { Occurrence } from '../models/occurrences.model';
import { OccurrenceRepository } from '../repositories/occurrences.repository';

interface OccurrenceServiceDependencies {
  occurrenceRepository: OccurrenceRepository;
}

export class OccurrenceService {
  occurrenceRepository!: OccurrenceRepository;

  constructor({ occurrenceRepository }: OccurrenceServiceDependencies) {
    this.occurrenceRepository = occurrenceRepository;
  }

  async create({ description, code, registeredAt }: {
    description: string,
    code: string,
    registeredAt: Date,
  }): Promise<Occurrence> {
    try {
      return await this.occurrenceRepository.create({
        description,
        code,
        registeredAt,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async list(): Promise<Occurrence[]> {
    try {
      return await this.occurrenceRepository.list();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: number): Promise<Occurrence> {
    return this.occurrenceRepository.findById(id);
  }

  async update(id: number, {
    description,
    code,
    registeredAt,
  }: Occurrence): Promise<boolean> {
    return await this.occurrenceRepository.update(id, {
      description,
      code,
      registeredAt,
    });
  }
}
