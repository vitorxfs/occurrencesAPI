import { Occurrences } from '../models/occurrences.model';
import { OccurrencesRepository } from '../repositories/occurrences.repository';

interface OccurrencesServiceOpt {
  occurrencesRepository: OccurrencesRepository;
}

export class OccurrencesService {
  occurrencesRepository!: OccurrencesRepository;

  constructor({ occurrencesRepository }: OccurrencesServiceOpt) {
    this.occurrencesRepository = occurrencesRepository;
  }

  async create({ description, code, registeredAt }: {
    description: string,
    code: string,
    registeredAt: Date,
  }): Promise<Occurrences> {
    try {
      return await this.occurrencesRepository.create({
        description,
        code,
        registeredAt,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async list(): Promise<Occurrences[]> {
    try {
      return await this.occurrencesRepository.list();
    } catch (error) {
      throw new Error(error);
    }
  }
}
