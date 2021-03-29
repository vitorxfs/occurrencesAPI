import { EmptyResultError } from 'sequelize';

import { Occurrence, OccurrenceAttributes } from '../models/occurrences.model';
import { Occurrence as OccurrenceDbModel } from '../database/models/occurrences';
import { OccurrenceNotFoundError } from '../errors/occurrences.error';
import { OccurrenceParser } from '../database/parser/occurrences.parser';

interface OccurrenceRepositoryDependencies {
  occurrenceParser: OccurrenceParser;
}

export class OccurrenceRepository {
  occurrenceParser: OccurrenceParser;

  constructor({ occurrenceParser }: OccurrenceRepositoryDependencies) {
    this.occurrenceParser = occurrenceParser;
  };

  async create(occurrence: Omit<OccurrenceAttributes, 'id'>): Promise<Occurrence> {
    const {
      description,
      code,
      registeredAt,
    } = occurrence;

    const createdOccurrence = await OccurrenceDbModel.create({
      description,
      code,
      registeredAt,
    });

    return this.occurrenceParser.parse(createdOccurrence);
  };

  async list(): Promise<Occurrence[]> {
    const occurrences = await OccurrenceDbModel.findAll();
    return occurrences.map(occurrence => this.occurrenceParser.parse(occurrence));
  }

  async findById(id: number): Promise<Occurrence> {
    try {
      const occurrence = await OccurrenceDbModel.findOne({
        rejectOnEmpty: true,
        where: { id },
      });

      return this.occurrenceParser.parse(occurrence);
    } catch (error) {
      if (error instanceof EmptyResultError) {
        throw new OccurrenceNotFoundError('id', id.toString());
      }

      throw error;
    }
  }
};
