import { Occurrences, OccurrencesAttributes } from '../models/occurrences.model';
import { Occurrences as OccurrencesDbModel } from '../database/models/occurrences';
import { OccurrencesParser } from '../database/parser/occurrences.parser';

interface OccurrencesRepositoryDependencies {
  occurrencesParser: OccurrencesParser;
}

export class OccurrencesRepository {
  occurrencesParser: OccurrencesParser;

  constructor({ occurrencesParser }: OccurrencesRepositoryDependencies) {
    this.occurrencesParser = occurrencesParser;
  };

  async create(occurrence: Omit<OccurrencesAttributes, 'id'>): Promise<Occurrences> {
    const {
      description,
      code,
      registeredAt,
    } = occurrence;

    const createdOccurrence = await OccurrencesDbModel.create({
      description,
      code,
      registeredAt,
    });

    return this.occurrencesParser.parse(createdOccurrence);
  };

  async list(): Promise<Occurrences[]> {
    const occurrences = await OccurrencesDbModel.findAll();
    return occurrences.map(occurrence => this.occurrencesParser.parse(occurrence));
  }
};
