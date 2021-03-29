import { BaseError } from '@enviabybus/utility-belt';

export class OccurrenceError extends BaseError { }

export class OccurrenceNotFoundError extends OccurrenceError {
  constructor(property: string, value?: string) {
    super({
      code: 'occurrence-not-found',
      message: `Occurrence not found by ${property}: ${value}`,
    });
  }
}
