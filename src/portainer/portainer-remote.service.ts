import { HttpService } from '@nestjs/axios';
import { GetPortainerServicesStatusResponse } from './responses/get-portainer-services-status-response';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PortainerRemoteService {
  constructor(private readonly httpService: HttpService) {}

  async getPortainerServicesStatus() {
    const response = await this.httpService.axiosRef.get<
      GetPortainerServicesStatusResponse[]
    >('/api/endpoints/2/docker/containers/json');

    return response.data;
  }
}
