/* eslint-disable @typescript-eslint/require-await */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PortainerRemoteService } from './portainer-remote.service';
import { EnvModule } from 'src/env/env.module';
import { EnvService } from 'src/env/env.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [EnvModule],
      useFactory: async (envService: EnvService) => ({
        baseURL: envService.get('PORTAINER_URL'),
        headers: {
          'X-API-KEY': envService.get('PORTAINER_ACCESS_TOKEN'),
        },
      }),
      inject: [EnvService],
    }),
  ],
  providers: [PortainerRemoteService],
  exports: [PortainerRemoteService],
})
export class PortainerModule {}
