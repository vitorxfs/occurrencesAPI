import { OccurrencesParser } from './database/parser/occurrences.parser';
import { OccurrencesRepository } from './repositories/occurrences.repository';
import { OccurrencesService } from './services/occurrence.service';

export function getOccurrencesParser() {
  return new OccurrencesParser();
}

export function getOccurrencesRepository() {
  return new OccurrencesRepository({
    occurrencesParser: getOccurrencesParser(),
  });
}

export function getOccurrencesService() {
  return new OccurrencesService({
    occurrencesRepository: getOccurrencesRepository(),
  });
}
