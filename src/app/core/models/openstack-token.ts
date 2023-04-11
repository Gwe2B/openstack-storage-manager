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

export interface OSCatalogEntry {
  endpoints: Endpoint[];
  type: string;
  id: string;
  name: string;
}

export interface Endpoint {
  id: string;
  interface: string;
  region: string;
  region_id: string;
  url: string;
}
