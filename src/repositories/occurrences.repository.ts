import { EmptyResultError } from 'sequelize';
import { isNil, omitBy } from 'lodash';

import { Occurrence, OccurrenceAttributes } from '../models/occurrences.model';
import { Occurrence as OccurrenceDbModel } from '../database/models/occurrences';
import { OccurrenceRepositoryNotFoundError } from '../errors/repositories/occurrences-repository.error';
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

  async list({ limit, offset }: { limit?: number, offset?: number }): Promise<Occurrence[]> {
    const options = {} as any;

    if (limit) { options.limit = limit; }
    if (offset) { options.offset = offset; }

    const occurrences = await OccurrenceDbModel.findAll(options);
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
        throw new OccurrenceRepositoryNotFoundError('id', id.toString());
      }

      throw error;
    }
  }

  async update(id: number, {
    description,
    code,
    registeredAt,
  }: {
    description?: string,
    code?: string,
    registeredAt?: Date,
  }): Promise<boolean> {
    const attributes = omitBy({
      description,
      code,
      registeredAt,
    }, isNil);
    const updatedOccurrence = await OccurrenceDbModel.update(attributes, { where: { id } });
    if (updatedOccurrence[0] === 0) {
      throw new OccurrenceRepositoryNotFoundError('id', id.toString());
    }
    return true;
  }

  async destroy(id: number): Promise<void> {
    const numberDeletedOccurrences = await OccurrenceDbModel.destroy({ where: { id } });
    if (numberDeletedOccurrences === 0) {
      throw new OccurrenceRepositoryNotFoundError('id', id.toString());
    }
  }
};
