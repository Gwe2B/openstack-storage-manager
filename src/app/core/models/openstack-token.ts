export interface OpenstackToken {
  token: string;
  url: {
    url: string;
    interface: string;
    region: string;
    region_id: string;
    id: string;
  }[];
  expires: string;
}

export interface OpenstackTokenRequireResponse {}
