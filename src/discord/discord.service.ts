import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { PortainerRemoteService } from '../portainer/portainer-remote.service';

@Injectable()
export class DiscordService {
  constructor(
    private readonly portainerRemoteService: PortainerRemoteService,
  ) {}

  @SlashCommand({
    name: 'status',
    description: 'Verifique o Status do Mumuca Lab',
    dmPermission: true,
  })
  async onStatusCommand(@Context() [interaction]: SlashCommandContext) {
    await interaction.deferReply();

    try {
      const status =
        await this.portainerRemoteService.getPortainerServicesStatus();
      const statusMessage = status
        .map(
          (service) =>
            `${service.Labels['com.docker.compose.service']}: ${service.Status}`,
        )
        .join('\n');
      await interaction.followUp({
        content: `Status dos serviços:\n${statusMessage}`,
      });
    } catch {
      await interaction.followUp({
        content: 'Não foi possível obter o status dos serviços.',
      });
    }
  }
}
