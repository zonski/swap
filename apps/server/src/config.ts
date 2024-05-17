import { z } from "zod";
import { LazyProvider } from "./util/provider/lazy-provider.js";

const appConfigSchema = z.object({
  port: z.number(),
  allowedCorsUrls: z.array(z.string()),
  // db: z.object({
  //   host: z.string(),
  //   port: z.number(),
  //   user: z.string(),
  //   password: z.string(),
  //   database: z.string(),
  // }),
  log: z.object({
    format: z.string(),
    level: z.string(),
  }),
});

export type AppConfig = z.infer<typeof appConfigSchema>;

interface ParseContext {
  missingEnvironmentVariables: string[];
}

const parseConfig = (provider: (ctx: ParseContext) => AppConfig) => {
  const ctx: ParseContext = { missingEnvironmentVariables: [] };
  const config = provider(ctx);
    if (ctx.missingEnvironmentVariables.length) {
      const msg = `Required environment variables have not been set: ${ctx.missingEnvironmentVariables.join(", ")}`;
      throw new Error(msg);
    }
  return appConfigSchema.parse(config);
};

const required = (ctx: ParseContext, key: string): string => {
  const val = process.env[key];
  if (val === undefined) {
    ctx.missingEnvironmentVariables.push(key);
  }
  return val ?? "";
};

const configProvider = new LazyProvider<AppConfig>(() =>
  parseConfig((ctx) => ({
    port: parseInt(process.env.PORT ?? "8080"),
    allowedCorsUrls: required(ctx, "ALLOWED_CORS_URLS").split(","),
    // db: {
    //   host: required(ctx, "DB_HOST"),
    //   port: parseInt(process.env.DB_PORT ?? "3306"),
    //   user: required(ctx, "DB_USER"),
    //   password: required(ctx, "DB_PASSWORD"),
    //   database: required(ctx, "DB_DATABASE"),
    // },
    log: {
      format: process.env.LOG_FORMAT || "console",
      level: process.env.LOG_LEVEL || "info",
    },
  })),
);

export const overrideConfig = (config: AppConfig) => configProvider.set(config);
export const getConfig = () => configProvider.get();
