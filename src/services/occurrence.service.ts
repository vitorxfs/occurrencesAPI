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
    registeredAt: string,
  }): Promise<Occurrences> {
    try {
      // Transforma a data em registeredAt em ISO String
      const registeredAtDate = new Date(registeredAt).toISOString();

      return await this.occurrencesRepository.create({
        description,
        code,
        registeredAt: registeredAtDate,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
