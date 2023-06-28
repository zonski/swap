import * as dotenv from "dotenv";

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
console.log(`Loaded config from ${envFile}`);
dotenv.config({ path: envFile });

const requiredEnv = (key: string) => {
  const v = process.env[key];
  if (!v) {
    throw new Error('Required environment variable was not set: ' + key);
  }
  return v;
};

export const config = {
  nodeEnv:  process.env.NODE_ENV,
  port:  process.env.PORT || 80,
  clientUrl: requiredEnv('CLIENT_URL'),
  auth0: {
    domain: requiredEnv('AUTH0_DOMAIN'),
    audience: requiredEnv('AUTH0_AUDIENCE'),
  },
}

