import { noop } from '@barso/helpers';
import pino from 'pino';

import { axiomTransport } from './axiom-transport.js';

export function getLogger(options = {}) {
  const environment = process.env.VERCEL_ENV || process.env.NODE_ENV;

  if (['preview', 'production'].includes(environment) || process.env.AXIOM_DATASET) {
    const pinoLogger = pino(
      {
        ...options,
        base: {
          environment,
          ...options.base,
        },
      },
      axiomTransport(),
    );

    return pinoLogger;
  }

  const logLevel = process.env.LOG_LEVEL;

  if (logLevel === 'silent') {
    const silentLogger = { debug: noop, error: noop, fatal: noop, info: noop, trace: noop, warn: noop, flush: noop };
    return silentLogger;
  }

  const consoleLogger = {
    ...console,
    info: noop,
    fatal: console.error,
    flush: noop,
  };

  if (['info', 'debug'].includes(logLevel)) {
    // eslint-disable-next-line no-console
    consoleLogger.info = console.log;
  }

  return consoleLogger;
}
