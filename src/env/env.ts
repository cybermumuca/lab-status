import { z } from 'zod';

export const envSchema = z.object({
  DISCORD_APP_ID: z.string(),
  DISCORD_TOKEN: z.string(),
  DISCORD_PUBLIC_KEY: z.string(),
  DISCORD_DEVELOPMENT_GUILD: z.string(),
  PORTAINER_URL: z.string().url(),
  PORTAINER_ACCESS_TOKEN: z.string(),
});

export type Env = z.infer<typeof envSchema>;
