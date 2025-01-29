/* eslint-disable @typescript-eslint/require-await */
import { Module } from '@nestjs/common';
import { IntentsBitField } from 'discord.js';
import { NecordModule } from 'necord';
import { DiscordUpdate } from './discord.update';
import { EnvModule } from 'src/env/env.module';
import { EnvService } from 'src/env/env.service';
import { PortainerModule } from 'src/portainer/portainer.module';
import { StatusCommand } from './commands/status.command';

@Module({
  imports: [
    PortainerModule,
    NecordModule.forRootAsync({
      imports: [EnvModule],
      useFactory: async (envService: EnvService) => ({
        token: envService.get('DISCORD_TOKEN'),
        intents: [IntentsBitField.Flags.Guilds],
        development: [envService.get('DISCORD_DEVELOPMENT_GUILD')],
      }),
      inject: [EnvService],
    }),
  ],
  providers: [DiscordUpdate, StatusCommand],
})
export class DiscordModule {}
