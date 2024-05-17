import winston, { format } from "winston";
import { getConfig } from "../../config";

const formatLog =
  getConfig().log.format === "console"
    ? format.combine(
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      format.printf(
        ({ timestamp, level, message, defaultMeta }) =>
          `[${defaultMeta.service}] ${timestamp} - ${level}: ${message}`,
      ),
    )
    : format.json();

const baseLogger = winston.createLogger({
  level: getConfig().log.level,
  transports: [new winston.transports.Console({ format: formatLog })],
});

export const createLogger = (name: string) =>
  baseLogger.child({
    defaultMeta: {
      service: name,
    },
  });
