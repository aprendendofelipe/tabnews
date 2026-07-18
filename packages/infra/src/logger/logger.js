import { deepMerge, noop } from '@barso/helpers';
import pino from 'pino';

import { axiomTransport } from './axiom-transport';

export function getLogger(options = {}) {
  const environment = process.env.VERCEL_ENV || process.env.NODE_ENV;
  const logLevel = process.env.LOG_LEVEL;
  const level = logLevel || options.level || 'info';

  if (['preview', 'production'].includes(environment) || process.env.AXIOM_DATASET) {
    const pinoLogger = pino(
      {
        ...options,
        base: {
          environment,
          ...options.base,
        },
        level,
      },
      axiomTransport(),
    );

    return pinoLogger;
  }

  return createConsoleLogger({
    effectiveMinLocalLogLevel: logLevel || (environment === 'test' ? 'silent' : 'warn'),
    level,
  });
}

const LOG_LEVEL_PRIORITIES = {
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
  silent: 70,
};

const consoleRef = globalThis.console;

function getConsoleMethod(level) {
  const map = {
    trace: consoleRef.trace,
    debug: consoleRef.debug,
    info: consoleRef.log,
    warn: consoleRef.warn,
    error: consoleRef.error,
    fatal: consoleRef.error,
  };

  return map[level] || consoleRef.log;
}

function createConsoleLogger({ bindings = {}, effectiveMinLocalLogLevel = 'warn', level = 'info' } = {}) {
  const currentBindings = { ...bindings };

  const log = (targetLevel, ...args) => {
    if (!isLevelEnabled(targetLevel, effectiveMinLocalLogLevel)) {
      return;
    }

    const method = getConsoleMethod(targetLevel);

    if (args.length === 0) {
      if (Object.keys(currentBindings).length > 0) {
        method({ ...currentBindings });
      }

      return;
    }

    const [firstArg, ...restArgs] = args;

    if (typeof firstArg === 'string') {
      if (Object.keys(currentBindings).length > 0) {
        method(firstArg, { ...currentBindings }, ...restArgs);
        return;
      }

      method(firstArg, ...restArgs);
      return;
    }

    if (firstArg && typeof firstArg === 'object') {
      const payload = deepMerge(currentBindings, firstArg);

      if (typeof restArgs[0] === 'string') {
        const [msg, ...remaining] = restArgs;
        method(msg, payload, ...remaining);
        return;
      }

      method(payload, ...restArgs);
      return;
    }

    method(firstArg, ...restArgs);
  };

  const logger = {
    get level() {
      return level;
    },
    set level(nextLevel) {
      if (nextLevel in LOG_LEVEL_PRIORITIES) {
        level = nextLevel;
      }
    },
    trace(...args) {
      log('trace', ...args);
    },
    debug(...args) {
      log('debug', ...args);
    },
    info(...args) {
      log('info', ...args);
    },
    warn(...args) {
      log('warn', ...args);
    },
    error(...args) {
      log('error', ...args);
    },
    fatal(...args) {
      log('fatal', ...args);
    },
    flush: noop,
    bindings() {
      return { ...currentBindings };
    },
    setBindings(nextBindings = {}) {
      Object.assign(currentBindings, deepMerge(currentBindings, nextBindings));
    },
    child(childBindings = {}) {
      return createConsoleLogger({
        effectiveMinLocalLogLevel,
        level,
        bindings: deepMerge(currentBindings, childBindings),
      });
    },
    isLevelEnabled(targetLevel) {
      return isLevelEnabled(targetLevel, level);
    },
  };

  return logger;
}

function isLevelEnabled(targetLevel, level) {
  const targetPriority = LOG_LEVEL_PRIORITIES[targetLevel];
  const currentPriority = LOG_LEVEL_PRIORITIES[level] ?? LOG_LEVEL_PRIORITIES.warn;

  if (targetPriority == null) {
    return false;
  }

  return targetPriority >= currentPriority;
}
