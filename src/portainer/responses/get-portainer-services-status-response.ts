/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
export interface GetPortainerServicesStatusResponse {
  Command: string;
  Created: number;
  HostConfig: {
    NetworkMode: string;
  };
  Id: string;
  Image: string;
  ImageID: string;
  Labels: {
    [key: string]: string;
  };
  Mounts: Array<{
    Destination: string;
    Mode: string;
    Propagation: string;
    RW: boolean;
    Source: string;
    Type: string;
    Driver?: string;
    Name?: string;
  }>;
  Names: string[];
  NetworkSettings: {
    Networks: {
      [networkName: string]: {
        Aliases: string[] | null;
        DNSNames: string[] | null;
        DriverOpts: any | null;
        EndpointID: string;
        Gateway: string;
        GlobalIPv6Address: string;
        GlobalIPv6PrefixLen: number;
        IPAMConfig: any | null;
        IPAddress: string;
        IPPrefixLen: number;
        IPv6Gateway: string;
        Links: string[] | null;
        MacAddress: string;
        NetworkID: string;
      };
    };
  };
  Ports: Array<{
    IP?: string;
    PrivatePort: number;
    PublicPort?: number;
    Type: string;
  }>;
  State: string;
  Status: string;
  IsPortainer?: boolean;
  Portainer?: {
    ResourceControl: {
      Id: number;
      ResourceId: string;
      SubResourceIds: string[];
      Type: number;
      UserAccesses: any[];
      TeamAccesses: any[];
      Public: boolean;
      AdministratorsOnly: boolean;
      System: boolean;
    };
  };
}
