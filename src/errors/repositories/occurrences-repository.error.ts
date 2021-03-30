import { BaseError } from '@enviabybus/utility-belt';

export class OccurrenceRepositoryError extends BaseError { }

export class OccurrenceRepositoryNotFoundError extends OccurrenceRepositoryError {
  constructor(property: string, value?: string) {
    super({
      code: 'occurrence-not-found',
      message: `Occurrence not found by ${property}: ${value}`,
    });
  }
}
