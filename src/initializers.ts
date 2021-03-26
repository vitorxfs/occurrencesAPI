import { GandalfClient, HttpClient, HttpClientSuperAgentAdapter, Logger, LoggerAdapter, LoggerJsLogAdapter } from '@enviabybus/utility-belt';

import { GANDALF_HOST } from './env';
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

export function getHttpClient({ logger }: { logger: Logger }) {
  const httpClientAdapter = new HttpClientSuperAgentAdapter();
  return new HttpClient({
    adapter: httpClientAdapter,
    logger,
  });
}

let loggerAdapter: LoggerAdapter;
export function getLoggerAdapter(): LoggerAdapter {
  if (loggerAdapter) { return loggerAdapter; }

  loggerAdapter = new LoggerJsLogAdapter();

  return loggerAdapter;
}

export function getLogger(): Logger {
  const loggerAdapter = getLoggerAdapter();
  return new Logger({ adapter: loggerAdapter });
}

export function getGandalfClient() {
  const logger = getLogger();
  return new GandalfClient({
    host: GANDALF_HOST,
    httpClient: getHttpClient({ logger }),
  });
}
