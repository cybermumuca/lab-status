import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscordModule } from './discord/discord.module';
import { envSchema } from './env/env';
import { EnvModule } from './env/env.module';
import { PortainerModule } from './portainer/portainer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    DiscordModule,
    PortainerModule,
  ],
})
export class AppModule {}
