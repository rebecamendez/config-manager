import { getContextId } from 'middlewares/add-context/add-context.middleware';
import * as winston from 'winston';

const { combine, timestamp, splat, colorize, simple } = winston.format;

const addContext = winston.format(info => {
  const contextId = getContextId();

  if (contextId) {
    info['contextId'] = contextId;
  }

  return info;
})();

const consoleFormat = combine(splat(), timestamp(), addContext, colorize(), simple());

const winstonConsole = new winston.transports.Console({
  format: consoleFormat,
  level: 'debug'
});

const transports = [winstonConsole];

export const winstonLoggerOptions: winston.LoggerOptions = {
  transports
};
