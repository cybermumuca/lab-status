import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { PortainerRemoteService } from 'src/portainer/portainer-remote.service';
import { GetPortainerServicesStatusResponse } from 'src/portainer/responses/get-portainer-services-status-response';

@Injectable()
export class StatusCommand {
  constructor(
    private readonly portainerRemoteService: PortainerRemoteService,
  ) {}

  private formatStatusResponse(status: GetPortainerServicesStatusResponse[]) {
    const statusMessage = [
      '# 🖥️ Status dos Serviços',
      '---',
      ...status.map((serviceStatus) => this.formatServiceStatus(serviceStatus)),
    ].join('\n');

    return statusMessage;
  }

  private formatServiceStatus(
    serviceStatus: GetPortainerServicesStatusResponse,
  ): string {
    const name = serviceStatus.Labels['com.docker.compose.service'];
    const isRunning = serviceStatus.State === 'running';
    const stateEmoji = isRunning ? '🟢' : '🔴';
    const statusParts = serviceStatus.Status?.split(' ') || [];
    const uptime = statusParts.slice(1, 3).join(' ') || 'Offline';
    const healthStatus = statusParts.slice(3).join(' ') || 'N/A';

    const mappedPorts =
      serviceStatus.Ports.filter((port) => port.PublicPort)
        .map(
          (port) =>
            `- \`${port.IP ? port.IP + ':' : ''}${port.PublicPort}->${port.PrivatePort}/${port.Type}\``,
        )
        .join('\n') || '- Nenhuma';

    const unmappedPorts =
      serviceStatus.Ports.filter((port) => !port.PublicPort)
        .map((port) => `- \`${port.PrivatePort}/${port.Type}\``)
        .join('\n') || '- Nenhuma';

    return [
      `## 🛠️ Serviço: \`${name}\``,
      `🛜 **Estado:** \`${stateEmoji} ${isRunning ? 'Ativo' : 'Parado'}\``,
      `⏱️ **Uptime:** \`${uptime}\``,
      `❤️ **Status:** \`${healthStatus}\``,
      `🔗 **Portas Mapeadas:**\n${mappedPorts}`,
      `🔒 **Portas Não mapeadas:**\n${unmappedPorts}`,
    ].join('\n');
  }

  @SlashCommand({
    name: 'status',
    description: 'Verifique o Status dos serviços do Mumuca Lab',
    dmPermission: true,
  })
  async onStatusCommand(@Context() [interaction]: SlashCommandContext) {
    await interaction.deferReply();

    try {
      const status =
        await this.portainerRemoteService.getPortainerServicesStatus();

      const statusMessage = this.formatStatusResponse(status);

      await interaction.followUp({
        content: statusMessage,
      });
    } catch {
      await interaction.followUp({
        content:
          '❌ Não foi possível obter o status dos serviços. Tente novamente mais tarde.',
      });
    }
  }
}
