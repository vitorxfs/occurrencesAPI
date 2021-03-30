import {
  ApiErrorHandler,
  GandalfClient,
  HttpClient, HttpClientAdapter,
  HttpClientSuperAgentAdapter,
  Logger,
  LoggerAdapter,
  LoggerJsLogAdapter,
} from '@enviabybus/utility-belt';

import { GANDALF_HOST } from './env';
import { OccurrenceParser } from './database/parser/occurrences.parser';
import { OccurrenceRepository } from './repositories/occurrences.repository';
import { OccurrenceService } from './services/occurrence.service';
import { UserAuthenticator } from './authenticators/authenticator';

export function getApiErrorHandler({ logger }: { logger: Logger }): ApiErrorHandler {
  return new ApiErrorHandler({ logger });
}

export function getGandalfClient() {
  const logger = getLogger();
  const httpClientAdapter = getHttpClientAdapter();

  return new GandalfClient({
    host: GANDALF_HOST,
    httpClient: getHttpClient({ logger, httpClientAdapter }),
  });
}

export function getHttpClientAdapter(): HttpClientAdapter {
  return new HttpClientSuperAgentAdapter();
}

export function getHttpClient({
  logger,
  httpClientAdapter,
}: {
  logger: Logger,
  httpClientAdapter: HttpClientAdapter,
}) {
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

export function getOccurrenceParser() {
  return new OccurrenceParser();
}

export function getOccurrenceRepository() {
  return new OccurrenceRepository({
    occurrenceParser: getOccurrenceParser(),
  });
}

export function getOccurrenceService() {
  return new OccurrenceService({
    occurrenceRepository: getOccurrenceRepository(),
  });
}

export function getUserAuthenticator() {
  return new UserAuthenticator({
    host: GANDALF_HOST,
    httpClientAdapter: getHttpClientAdapter(),
  });
}
