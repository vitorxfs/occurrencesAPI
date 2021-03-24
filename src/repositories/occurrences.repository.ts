import { OccurrencesParser } from '../database/parser/occurrences.parser';
import { Occurrences, OccurrencesAttributes } from '../models/occurrences.model';
import { Occurrences as OccurrencesDbModel } from '../database/models/occurrences';

interface OccurrencesRepositoryDependencies {
  occurrencesParser: OccurrencesParser;
}

export class OccurrencesRepository {
  private occurrencesParser: OccurrencesParser;

  constructor({ occurrencesParser }: OccurrencesRepositoryDependencies) {
    this.occurrencesParser = occurrencesParser;
  };

  async create(occurrence: Omit<OccurrencesAttributes, 'id'>): Promise<Occurrences> {
    const {
      description,
      code,
      registeredAt,
    } = occurrence;

    try {
      const createdOccurrence = await OccurrencesDbModel.create({
        description,
        code,
        registeredAt,
      });

      return this.occurrencesParser.parse(createdOccurrence);
    } catch (error) {
      throw new Error(error);
    }
  };
};
